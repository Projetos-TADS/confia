import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { getUsers, updateUser } from "../data/api";

export default function UpdateUserScreen({ route, navigation }) {
  const { userId } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const users = await getUsers();
      const user = users.find((u) => u.id === userId);
      if (user) {
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
        setLocation(user.location);
        setUserType(user.userType);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleUpdate = async () => {
    try {
      await updateUser(userId, { name, email, password, location, userType });
      Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo (client/provider)"
        value={userType}
        onChangeText={setUserType}
      />
      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
});
