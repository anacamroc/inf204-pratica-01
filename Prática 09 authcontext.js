import React, {
  createContext,
  useState,
  useEffect
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Criacao do Contexto
export const AuthContext = createContext(undefined);

// Provider
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Recuperar usuario ao iniciar o aplicativo
  useEffect(() => {
    async function carregarUsuario() {
      try {
        const usuarioSalvo =
          await AsyncStorage.getItem("@usuario");

        if (usuarioSalvo) {
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch (error) {
        console.log("Erro ao recuperar usuario:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarUsuario();
  }, []);

  // Login
  async function signIn(email, senha) {
    try {
      const respostaAPI = {
        id: "123",
        nome: "Turma INF204",
        email: email
      };

      await AsyncStorage.setItem(
        "@usuario",
        JSON.stringify(respostaAPI)
      );

      setUsuario(respostaAPI);

    } catch (error) {
      console.log("Erro ao salvar usuario:", error);
    }
  }

  // Logout
  async function signOut() {
    try {
      await AsyncStorage.removeItem("@usuario");
      setUsuario(null);
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        logado: !!usuario,
        usuario,
        signIn,
        signOut,
        carregando
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
