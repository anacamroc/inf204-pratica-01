import React from "react";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";

import {
  NavigationContainer
} from "@react-navigation/native";

import {
  View,
  Text,
  Button,
  ActivityIndicator
} from "react-native";

import { useAuth } from "../hooks/useAuth";
import { useTema } from "../hooks/useTema";

const Stack = createNativeStackNavigator();

// TELA DE LOGIN
function TelaLogin() {
  const { signIn } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Área Restrita
      </Text>

      <Button
        title="Entrar no Sistema"
        onPress={() =>
          signIn("teste@email.com", "123")
        }
      />
    </View>
  );
}

// TELA DASHBOARD
function TelaDashboard() {
  const { usuario, signOut } = useAuth();
  const { tema, alternarTema } = useTema();

  const fundo =
    tema === "claro" ? "#FFFFFF" : "#222222";

  const corTexto =
    tema === "claro" ? "#000000" : "#FFFFFF";

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: fundo
      }}
    >
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
          color: corTexto
        }}
      >
        Bem-vindo, {usuario?.nome}
      </Text>

      <Text
        style={{
          fontSize: 18,
          color: corTexto,
          marginBottom: 20
        }}
      >
        Tema atual: {tema}
      </Text>

      <Button
        title="Alternar Tema"
        onPress={alternarTema}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Sair da Conta"
          color="red"
          onPress={signOut}
        />
      </View>
    </View>
  );
}

// ROTEADOR PRINCIPAL
export default function Rotas() {
  const { logado, carregando } = useAuth();

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logado ? (
          <Stack.Screen
            name="Dashboard"
            component={TelaDashboard}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={TelaLogin}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
