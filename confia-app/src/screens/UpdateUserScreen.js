import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getUsers, updateUser } from "../data/api";

export default function UpdateUserScreen({ route, navigation }) {
  const { userId } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("client");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await getUsers();
        const user = users.find((u) => u.id === userId);
        if (user) {
          setName(user.name);
          setEmail(user.email);
          setLocation(user.location);
          setUserType(user.userType);
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      }
    };
    fetchUserData();
  }, [userId]);

  const handleUpdate = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const userData = {
        name,
        email,
        location,
        userType,
      };

      if (newPassword) {
        userData.password = newPassword;
      }

      await updateUser(userId, userData);
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
        placeholder="Nova Senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Nova Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
      />

      <View style={styles.userTypeContainer}>
        <Text style={styles.userTypeLabel}>Eu sou:</Text>
        <TouchableOpacity
          style={[styles.userTypeButton, userType === "client" && styles.userTypeButtonSelected]}
          onPress={() => setUserType("client")}
        >
          <Text
            style={[
              styles.userTypeButtonText,
              userType === "client" && styles.userTypeButtonTextSelected,
            ]}
          >
            Cliente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.userTypeButton, userType === "provider" && styles.userTypeButtonSelected]}
          onPress={() => setUserType("provider")}
        >
          <Text
            style={[
              styles.userTypeButtonText,
              userType === "provider" && styles.userTypeButtonTextSelected,
            ]}
          >
            Prestador
          </Text>
        </TouchableOpacity>
      </View>

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  userTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  userTypeLabel: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  userTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007BFF",
    marginHorizontal: 5,
    backgroundColor: "#E0E0E0",
  },
  userTypeButtonSelected: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  userTypeButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  userTypeButtonTextSelected: {
    color: "white",
  },
});
