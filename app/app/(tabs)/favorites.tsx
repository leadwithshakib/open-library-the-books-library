import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { books as initialBooks } from "../../data/books";

const { width } = Dimensions.get("window");

export default function Favorites() {
  const [books, setBooks] = useState(initialBooks);
  const [refreshing, setRefreshing] = useState(false);
  const favoriteBooks = books.filter((book) => book.isFavorite);

  const handleToggleFavorite = (id: string) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setBooks(initialBooks);
      setRefreshing(false);
    }, 1000);
  }, []);

  if (favoriteBooks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="heart"
          size={80}
          color="#FF6B6B"
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyText}>No Favorite Books Yet</Text>
        <Text style={styles.emptySubText}>
          Your favorite books will appear here. Start adding some to your
          collection!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#FF6B6B"]}
          tintColor="#FF6B6B"
          title="Refreshing..."
          titleColor="#666"
        />
      }
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="heart" size={24} color="#FF6B6B" />
          <Text style={styles.title}>My Favorites</Text>
        </View>
        <Text style={styles.subtitle}>
          {favoriteBooks.length} books in collection
        </Text>
      </View>
      <View style={styles.booksList}>
        {favoriteBooks.map((book) => (
          <Pressable
            key={book.id}
            style={({ pressed }) => [
              styles.bookItem,
              pressed && styles.bookItemPressed,
            ]}
          >
            <Image source={{ uri: book.coverImage }} style={styles.bookCover} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <View style={styles.bookMeta}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>
                    {book.rating?.toFixed(1)}
                  </Text>
                </View>
                <Text style={styles.bookCategory}>{book.category}</Text>
              </View>
              <Text style={styles.bookDescription} numberOfLines={2}>
                {book.description}
              </Text>
            </View>
            <Pressable
              onPress={() => handleToggleFavorite(book.id)}
              style={styles.favoriteButton}
            >
              <Ionicons
                name="heart"
                size={24}
                color={book.isFavorite ? "#FF6B6B" : "#E9ECEF"}
              />
            </Pressable>
          </Pressable>
        ))}
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
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    shadowRadius: 3,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#212529",
  },
  subtitle: {
    fontSize: 16,
    color: "#6C757D",
    marginTop: 4,
  },
  booksList: {
    padding: 16,
  },
  bookItem: {
    flexDirection: "row",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bookItemPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  bookCover: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 8,
  },
  bookMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#6C757D",
  },
  bookCategory: {
    fontSize: 14,
    color: "#6C757D",
    backgroundColor: "#E9ECEF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bookDescription: {
    fontSize: 14,
    color: "#6C757D",
    lineHeight: 20,
  },
  favoriteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F8F9FA",
  },
  emptyIcon: {
    marginBottom: 20,
    opacity: 0.8,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: "80%",
  },
});
