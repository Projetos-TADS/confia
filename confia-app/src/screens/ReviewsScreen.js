import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import ReviewCard from "../components/ReviewCard";
import { useReviews } from "../hooks/useReviews";

export default function ReviewsScreen() {
  const { reviews, loading } = useReviews();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ReviewCard review={item} />}
        ListHeaderComponent={<Text style={styles.header}>Avaliações dos Serviços</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma avaliação encontrada.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
