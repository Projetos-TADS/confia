import { StyleSheet, Text, View } from "react-native";

export default function ServiceCard({ service }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.category}>{service.category}</Text>
      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.price}>R$ {service.price.toFixed(2)}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "right",
  },
});
