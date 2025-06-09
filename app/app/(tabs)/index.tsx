import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BookCard } from "../../components/BookCard";
import { BookCategory, books as initialBooks } from "../../data/books";
import { Book } from "../../types/book";

const { width } = Dimensions.get("window");

export default function Index() {
  const [books, setBooks] =
    useState<(Book & { category: BookCategory })[]>(initialBooks);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const handleToggleFavorite = (id: string) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
      )
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh by resetting to initial books
    // In a real app, you would fetch fresh data from an API
    setTimeout(() => {
      setBooks(initialBooks);
      setRefreshing(false);
    }, 1000);
  }, []);

  const categories: BookCategory[] = [
    "Classics",
    "Fantasy",
    "Contemporary",
    "Philosophical",
    "Thriller",
    "Historical",
  ];

  // Get the highest rated book for the hero section
  const featuredBook = books.reduce((prev, current) =>
    (current.rating || 0) > (prev.rating || 0) ? current : prev
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ScrollView
        style={styles.scrollView}
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
        {/* Hero Section */}
        <Pressable
          style={styles.heroSection}
          onPress={() =>
            router.push({
              pathname: "/book/[id]",
              params: { id: featuredBook.id },
            })
          }
        >
          <Image
            source={{ uri: featuredBook.coverImage }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{featuredBook.title}</Text>
              <Text style={styles.heroAuthor}>{featuredBook.author}</Text>
              <View style={styles.heroRating}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.heroRatingText}>
                  {featuredBook.rating?.toFixed(1)}
                </Text>
              </View>
              <Text style={styles.heroDescription} numberOfLines={2}>
                {featuredBook.description}
              </Text>
            </View>
          </LinearGradient>
        </Pressable>

        {/* Categories */}
        {categories.map((category) => {
          const categoryBooks = books.filter(
            (book) => book.category === category
          );
          if (categoryBooks.length === 0) return null;

          return (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.booksContainer}
              >
                {categoryBooks.map((book) => (
                  <View key={book.id} style={styles.bookWrapper}>
                    <BookCard
                      book={book}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 400,
    width: width,
    position: "relative",
    marginBottom: 24,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
    padding: 20,
  },
  heroContent: {
    paddingBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  heroAuthor: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 12,
  },
  heroRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  heroRatingText: {
    marginLeft: 8,
    fontSize: 18,
    color: "#fff",
  },
  heroDescription: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 12,
    color: "#333",
  },
  booksContainer: {
    paddingHorizontal: 12,
  },
  bookWrapper: {
    width: 200,
    marginHorizontal: 4,
  },
});
