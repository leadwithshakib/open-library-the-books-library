import { SendMailEnum } from "../constants.js";
import { AuthenticatedUserModel } from "../models/auth/authenticated-user.model.js";
import { LoginHistoryModel } from "../models/auth/login-history.model.js";
import { UserModel } from "../models/auth/user.model.js";
import { VerificationModel } from "../models/auth/verification.model.js";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../schema/auth.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../utils/mail.js";

// Handles user signup: validates input, checks for existing user, creates authentication and profile records, sends verification email, and returns the created user profile.
export const signUp = asyncHandler(async (req, res) => {
  // Extract user details from request body
  const { name, email, password } = req.body;

  // Validate input using Zod schema
  const parsedBody = signUpSchema.safeParse(req.body);
  if (!parsedBody.success) {
    // Output: 400 Bad Request if validation fails
    return res
      .status(400)
      .json({ success: false, error: parsedBody.error.errors });
  }

  // Check if user already exists in the UserModel collection
  const existingUser = await AuthenticatedUserModel.findOne({
    email,
    type: "EMAIL",
  });

  if (existingUser) {
    // Output: 409 Conflict if user already exists
    throw new ApiError(409, "User with email or username already exists", []);
  }

  // Create new user in AuthenticatedUserModel (stores credentials)
  const newUser = await AuthenticatedUserModel.create({
    name,
    email,
    password,
  });
  if (!newUser) {
    // Output: 500 Internal Server Error if user creation fails
    throw new ApiError(500, "Failed to create user", []);
  }
  await newUser.save({ validateBeforeSave: false });

  // Create user profile in UserModel (stores public profile info)
  const userProfile = await UserModel.create({
    authUserId: newUser._id,
    name: newUser.name,
    email: newUser.email,
    avatar: `https://placehold.co/600x400?text=${newUser.name
      .charAt(0)
      .toUpperCase()}`,
  });

  if (!userProfile) {
    // Output: 500 Internal Server Error if profile creation fails
    throw new ApiError(500, "Failed to create user profile", []);
  }

  await userProfile.save({ validateBeforeSave: false });

  // Generate a temporary verification code for email verification
  const temporaryCode = newUser.generateTemporaryCode();

  // Create a verification record in VerificationModel
  const newVerification = await VerificationModel.create({
    authUserId: newUser._id,
    verificationCode: temporaryCode,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expires in 10 minutes
    type: "EMAIL",
    status: "PENDING",
    for: "VERIFY_EMAIL",
  });
  if (!newVerification) {
    // Output: 500 Internal Server Error if verification record creation fails
    throw new ApiError(500, "Failed to create verification record", []);
  }

  // Send verification email to the user
  await sendMail(SendMailEnum.VERIFY_EMAIL, {
    to: newUser.email,
    verificationCode: temporaryCode,
    name: newUser.name,
    expiredAfter: "10 minutes",
  });

  // Output: 201 Created with user profile and success message
  res.status(201).json({
    success: true,
    message: "User signed up successfully & verification email sent.",
    user: userProfile,
  });
});

export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const parsedBody = signInSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ success: false, error: parsedBody.error.errors });
  }

  const user = await AuthenticatedUserModel.findOne({ email, type: "EMAIL" });
  if (!user) {
    throw new ApiError(404, "User not found", []);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const loginHistory = await LoginHistoryModel.create({
      authUserId: user._id,
      ipAddress: req.ip,
      status: "FAILED",
      userAgent: req.headers["user-agent"],
    });
    if (!loginHistory) {
      throw new ApiError(500, "Failed to create login history", []);
    }

    await loginHistory.save({ validateBeforeSave: false });

    const loginHitoryCheck = await LoginHistoryModel.find({
      authUserId: user._id,
      ipAddress: req.ip,
      status: "FAILED",
    })
      .sort({ createdAt: -1 })
      .limit(5);
    if (loginHitoryCheck.length >= 5) {
      const firstFailedLogin = loginHitoryCheck[0];
      const lastFailedLogin = loginHitoryCheck[loginHitoryCheck.length - 1];

      const timeDifference =
        new Date(firstFailedLogin.createdAt) -
        new Date(lastFailedLogin.createdAt);
      if (timeDifference < 1 * 60 * 1000) {
        // 5 minutes
        await sendMail(SendMailEnum.TOO_MANY_FAILED_LOGIN_ATTEMPTS, {
          to: email,
          ipAddress: req.ip,
        });

        throw new ApiError(
          429,
          "Too many failed login attempts. Please try again later.",
          []
        );
      }
    }
    throw new ApiError(401, "Invalid credentials", []);
  }

  const accessToken = user.generateAccessToken();

  const userProfile = await UserModel.findOne({
    authUserId: user._id,
  }).select("-authUserId -__v -createdAt -updatedAt");

  if (!userProfile) {
    throw new ApiError(404, "User profile not found", []);
  }
  const loginHistory = await LoginHistoryModel.create({
    authUserId: user._id,
    ipAddress: req.ip,
    status: "SUCCESS",
    userAgent: req.headers["user-agent"],
  });
  if (!loginHistory) {
    throw new ApiError(500, "Failed to create login history", []);
  }
  await loginHistory.save({ validateBeforeSave: false });
  // Send a sign-in notification email to the user

  await sendMail(SendMailEnum.SIGN_IN, {
    to: user.email,
    name: user.name,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res
    .status(200)
    .cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    })
    .json({
      success: true,
      message: "User signed in successfully",
      user: userProfile,
      accessToken,
    });
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const parsedBody = forgetPasswordSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ success: false, error: parsedBody.error.errors });
  }

  const user = await AuthenticatedUserModel.findOne({ email, type: "EMAIL" });
  if (!user) {
    throw new ApiError(404, "User not found", []);
  }
  // Generate a temporary password reset code
  const temporaryCode = user.generateTemporaryCode();
  // Create a verification record for password reset
  const newVerification = await VerificationModel.create({
    authUserId: user._id,
    verificationCode: temporaryCode,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expires in 10 minutes
    type: "EMAIL",
    status: "PENDING",
    for: "RESET_PASSWORD",
  });
  if (!newVerification) {
    throw new ApiError(500, "Failed to create verification record", []);
  }
  // Send password reset email to the user
  await sendMail(SendMailEnum.RESET_PASSWORD, {
    to: user.email,
    verificationCode: temporaryCode,
    userName: user.name,
    expiredAfter: "10 minutes",
  });
  // Output: 200 OK with success message
  res.status(200).json({
    success: true,
    message: "Password reset email sent successfully",
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { verificationCode, newPassword } = req.body;
  const parsedBody = resetPasswordSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res
      .status(400)
      .json({ success: false, error: parsedBody.error.errors });
  }
  const verification = await VerificationModel.findOne({
    verificationCode,
    status: "PENDING",
    for: "RESET_PASSWORD",
  });
  if (!verification) {
    throw new ApiError(404, "Invalid or expired verification code", []);
  }
  if (verification.expiresAt < new Date()) {
    throw new ApiError(410, "Verification code has expired", []);
  }
  const user = await AuthenticatedUserModel.findById(verification.authUserId);
  if (!user) {
    throw new ApiError(404, "User not found", []);
  }
  user.password = newPassword;
  await user.save();
  verification.status = "COMPLETED";
  await verification.save();
  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

export const signOut = asyncHandler(async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  // Output: 200 OK with success message
  res.status(200).json({
    success: true,
    message: "User signed out successfully",
  });
});
