import { Button, StyleSheet, Text, View } from "react-native";

export default function UserDetailsScreen({ route, navigation }) {
  const { userId, userName, loggedInUserId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes de</Text>
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.userId}>ID: {userId}</Text>
      {userId === loggedInUserId && (
        <View style={styles.buttonContainer}>
          <Button
            title="Editar Perfil"
            onPress={() => navigation.navigate("UpdateUser", { userId: userId })}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", backgroundColor: "#f5f5f5" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  userName: { fontSize: 28, marginBottom: 20, color: "#333" },
  userId: { fontSize: 16, color: "gray", marginBottom: 30 },
  buttonContainer: { width: "80%" },
});
