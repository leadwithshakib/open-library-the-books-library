import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Book } from "../app/types/book";

export const BookCard: React.FC<{
  book: Book;
  onToggleFavorite: (id: string) => void;
}> = ({ book, onToggleFavorite }) => {
  const router = useRouter();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/book/[id]",
          params: { id: book.id },
        })
      }
    >
      <Image source={{ uri: book.coverImage }} style={styles.cover} />
      <Pressable
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(book.id)}
      >
        <Ionicons
          name={book.isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={book.isFavorite ? "#ff4444" : "#666"}
        />
      </Pressable>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {book.author}
        </Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{book.rating?.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cover: {
    width: "100%",
    height: 280,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 4,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000",
  },
  author: {
    fontSize: 14,
    color: "#000",
    opacity: 0.8,
    marginBottom: 4,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#000",
    opacity: 0.8,
  },
});
