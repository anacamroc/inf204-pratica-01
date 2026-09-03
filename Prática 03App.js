import React, { useState } from "react";
import JogoDaVelha from "./JogoDaVelha";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function App() {
  const [nome, setNome] = useState("Joao Vitor");
  const [seguindo, setSeguindo] = useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudoScroll}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.cartao}>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>{nome}</Text>

        <Text style={styles.profissao}>
          Engenheiro de Software
        </Text>

        <TouchableOpacity
          style={[
            styles.botao,
            seguindo && styles.botaoDesativado,
          ]}
          activeOpacity={0.7}
          onPress={() => setSeguindo(!seguindo)}
        >
          <Text style={styles.textoBotao}>
            {seguindo ? "Seguindo" : "Seguir"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Alterar nome..."
          value={nome}
          onChangeText={setNome}
        />

        <View style={{ height: 500 }} />
      </View>
      <JogoDaVelha />
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  conteudoScroll: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  nomeUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
  },

  profissao: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },

  botaoDesativado: {
    backgroundColor: "#A0A0A0",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },

  teste: {
    marginTop: 20,
    fontSize: 18,
    color: "#333",
  },
});
