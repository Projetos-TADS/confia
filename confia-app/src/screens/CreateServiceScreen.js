import { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { createService } from "../data/api";

export default function CreateServiceScreen({ route, navigation }) {
  const { providerId } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleCreateService = async () => {
    if (!title || !description || !category || !price) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }
    if (isNaN(parseFloat(price))) {
      Alert.alert("Erro", "O preço deve ser um número válido.");
      return;
    }

    try {
      const serviceData = {
        providerId,
        title,
        description,
        category,
        price: parseFloat(price),
      };
      await createService(serviceData);
      Alert.alert("Sucesso", "Serviço criado com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Erro ao criar serviço", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ofereça seu Serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="Título do Serviço (Ex: Eletricista Residencial)"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Descrição Detalhada do Serviço"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria (Ex: Eletricista, Limpeza)"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço (Ex: 150.00)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Adicionar Serviço" onPress={handleCreateService} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "white",
    textAlignVertical: "top",
  },
});
