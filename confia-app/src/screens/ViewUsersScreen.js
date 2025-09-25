import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteUser, getUsers } from "../data/api";

function UserCard({ user, onDelete, onViewDetails }) {
  const handleDelete = () => {
    Alert.alert("Confirmar Exclusão", `Tem certeza que deseja excluir ${user.name}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", onPress: () => onDelete(user.id), style: "destructive" },
    ]);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onViewDetails(user)}>
        <Text style={styles.cardTitle}>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text style={styles.userType}>{user.userType}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ViewUsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      Alert.alert("Sucesso", "Usuário excluído com sucesso.");
      fetchUsers();
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  const handleViewDetails = (user) => {
    navigation.navigate("UserDetails", { userId: user.id, userName: user.name });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard user={item} onDelete={handleDeleteUser} onViewDetails={handleViewDetails} />
        )}
        ListHeaderComponent={<Text style={styles.header}>Usuários Cadastrados</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>}
        onRefresh={fetchUsers}
        refreshing={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { fontSize: 22, fontWeight: "bold", margin: 16, textAlign: "center" },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16, color: "gray" },
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  userType: { fontStyle: "italic", color: "#666", marginTop: 4 },
  deleteButton: { backgroundColor: "#ff4d4d", padding: 10, borderRadius: 5 },
  deleteButtonText: { color: "white", fontWeight: "bold" },
});
