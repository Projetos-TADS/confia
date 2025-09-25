import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Cadastro" }} />
      <Stack.Screen name="search" options={{ title: "Buscar Serviços" }} />
      <Stack.Screen name="reviews" options={{ title: "Todas as Avaliações" }} />
      <Stack.Screen name="create-service" options={{ title: "Adicionar Serviço" }} />
      <Stack.Screen name="service/[id]" options={{ title: "Avaliações do Serviço" }} />
    </Stack>
  );
}
