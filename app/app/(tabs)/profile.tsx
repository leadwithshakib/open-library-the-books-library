import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { books } from "../../data/books";
import { Review } from "../../types/book";

// Mock user reviews data - in a real app, this would come from a backend
const userReviews: (Review & { bookId: string })[] = [
  {
    id: "1",
    userId: "user1",
    bookId: "1",
    rating: 5,
    comment: "An amazing classic that everyone should read!",
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    bookId: "3",
    rating: 4,
    comment: "Thought-provoking dystopian novel.",
    createdAt: "2024-03-14T15:30:00Z",
  },
];

export default function Profile() {
  const router = useRouter();

  const renderStars = (rating: number) => {
    return (
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Ionicons name="person-circle" size={40} color="#666" />
          <Text style={styles.username}>John Doe</Text>
        </View>
      </View>

      <View style={styles.reviewsSection}>
        <View style={styles.reviewsHeader}>
          <Text style={styles.sectionTitle}>My Reviews</Text>
          <Text style={styles.reviewCount}>{userReviews.length} Reviews</Text>
        </View>

        {userReviews.map((review) => {
          const book = books.find((b) => b.id === review.bookId);
          if (!book) return null;

          return (
            <Pressable
              key={review.id}
              style={styles.reviewCard}
              onPress={() =>
                router.push({
                  pathname: "/book/[id]",
                  params: { id: book.id },
                })
              }
            >
              <View style={styles.reviewContent}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                {renderStars(review.rating)}
                <Text style={styles.reviewText}>{review.comment}</Text>
                <Text style={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
  },
  reviewsSection: {
    padding: 16,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
  },
  reviewCount: {
    fontSize: 16,
    color: "#6C757D",
    backgroundColor: "#E9ECEF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewContent: {
    gap: 12,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#212529",
  },
  stars: {
    flexDirection: "row",
    gap: 4,
  },
  reviewText: {
    fontSize: 16,
    color: "#495057",
    lineHeight: 24,
  },
  reviewDate: {
    fontSize: 14,
    color: "#6C757D",
    fontStyle: "italic",
  },
});
