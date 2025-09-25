import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createUser } from "../data/api";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("client");

  const handleSignUp = async () => {
    if (!name || !email || !password || !location || !userType) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        location,
        userType,
      };
      await createUser(userData);
      Alert.alert("Sucesso", "Conta criada com sucesso!", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      Alert.alert("Erro no Cadastro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Sua Cidade"
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

      <Button title="Cadastrar" onPress={handleSignUp} />
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
