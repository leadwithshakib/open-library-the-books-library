// Multer middleware for handling file uploads (images and PDFs)
import multer from "multer";

// Configure storage settings for uploaded files
const storage = multer.diskStorage({
  // Set the destination folder for uploaded files based on file type
  destination: function (req, file, cb) {
    // If the file is a PDF, save to public/pdf; otherwise, save images to public/images
    if (file.mimetype === "application/pdf") {
      cb(null, "./public/pdf");
    } else {
      cb(null, "./public/images");
    }
  },
  // Set the filename for uploaded files
  filename: function (req, file, cb) {
    // Generate a new unique name for every file, with prefix based on type
    const timestamp = Date.now();
    const random = Math.ceil(Math.random() * 1e5);
    let fileExtension = "";
    // Extract the file extension (e.g., .png, .jpg, .pdf)
    if (file.originalname.split(".").length > 1) {
      fileExtension = file.originalname.substring(
        file.originalname.lastIndexOf(".")
      );
    }
    let prefix = "file";
    if (file.mimetype === "application/pdf") {
      prefix = "pdf";
    } else if (file.mimetype.startsWith("image/")) {
      prefix = "image";
    }
    // New filename format: prefix-TIMESTAMP-RANDOM.EXT
    const newFileName = `${prefix}-${timestamp}-${random}${fileExtension}`;
    cb(null, newFileName);
  },
});

// File filter to allow only images and PDF files
function fileFilter(req, file, cb) {
  // Allowed file types: jpeg, jpg, png, gif, pdf
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only image and PDF files are allowed!"), false); // Reject file
  }
}

// Export the multer upload middleware
export const upload = multer({
  storage, // Use the storage settings above
  limits: {
    fileSize: 10 * 1000 * 1000, // Limit file size to 1MB
  },
  fileFilter, // Use the file filter to restrict file types
});

