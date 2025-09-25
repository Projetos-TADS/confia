import { StyleSheet, Text, View } from "react-native";

export default function ReviewCard({ review }) {
  return (
    <View style={styles.card}>
      <Text style={styles.rating}>Avaliação: {review.rating} Estrelas</Text>
      <Text style={styles.comment}>{review.comment}</Text>
      <Text style={styles.clientId}>Cliente ID: {review.clientId}</Text>
      <Text style={styles.serviceId}>Serviço ID: {review.serviceId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700", // Gold
    marginBottom: 4,
  },
  comment: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  clientId: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  serviceId: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
});
