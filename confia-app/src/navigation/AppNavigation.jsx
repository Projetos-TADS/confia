import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateServiceScreen from "../screens/CreateServiceScreen";
import LoginScreen from "../screens/LoginScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import SearchScreen from "../screens/SearchScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UpdateUserScreen from "../screens/UpdateUserScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen";
import ViewUsersScreen from "../screens/ViewUsersScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Cadastro" }} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: "Buscar Serviços" }}
        />
        <Stack.Screen
          name="Reviews"
          component={ReviewsScreen}
          options={{ title: "Todas as Avaliações" }}
        />
        <Stack.Screen
          name="CreateService"
          component={CreateServiceScreen}
          options={{ title: "Adicionar Serviço" }}
        />
        <Stack.Screen
          name="ViewUsers"
          component={ViewUsersScreen}
          options={{ title: "Usuários" }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={({ route }) => ({ title: route.params.userName })}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUserScreen}
          options={{ title: "Editar Usuário" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
