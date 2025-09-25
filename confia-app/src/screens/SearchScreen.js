import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from "react-native";
import ServiceCard from "../components/ServiceCard";
import { useServices } from "../hooks/useServices";

export default function SearchScreen({ route, navigation }) {
  const { services, loading, refetch } = useServices();
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {user.userType === "provider" && (
          <Button
            title="Oferecer Serviço"
            onPress={() => navigation.navigate("CreateService", { providerId: user.id })}
            color="#007BFF"
          />
        )}
        <Button
          title="Ver Usuários"
          onPress={() => navigation.navigate("ViewUsers", { loggedInUserId: user.id })}
          color="#28a745"
        />
        <Button
          title="Meu Perfil"
          onPress={() =>
            navigation.navigate("UserDetails", {
              userId: user.id,
              userName: user.name,
              loggedInUserId: user.id,
            })
          }
          color="#17a2b8"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ServiceCard service={item} />}
          ListHeaderComponent={<Text style={styles.header}>Serviços Disponíveis</Text>}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum serviço encontrado.</Text>}
          onRefresh={refetch}
          refreshing={loading}
        />
      )}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
