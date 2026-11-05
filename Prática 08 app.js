import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

// Inicialização das tabelas no banco de dados
const iniciarBanco = async (db) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);

  console.log("Base de dados inicializada!");
};

// Componente principal da aplicação
export default function App() {
  return (
    <SQLiteProvider
      databaseName="app-database.db"
      onInit={iniciarBanco}
    >
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

// Ecrã principal
function EcraPrincipal() {
  const db = useSQLiteContext();

  // Estado do utilizador como objeto
  const [nomeUsuario, setNomeUsuario] = useState({
    nome: "Visitante",
    logado: true,
  });

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // Carregar os dados quando o ecrã abrir
  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  // Ler o objeto do utilizador no AsyncStorage
  const carregarPreferencias = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem(
        "@AppTarefas:Usuario"
      );

      if (usuarioSalvo !== null) {
        setNomeUsuario(JSON.parse(usuarioSalvo));
      }
    } catch (erro) {
      console.error("Erro ao carregar o utilizador:", erro);
    }
  };

  // Guardar o objeto do utilizador no AsyncStorage
  const salvarNome = async () => {
    try {
      const novoUsuario = {
        nome: "Estudante INF204",
        logado: true,
      };

      await AsyncStorage.setItem(
        "@AppTarefas:Usuario",
        JSON.stringify(novoUsuario)
      );

      setNomeUsuario(novoUsuario);

      Alert.alert("Sucesso", "Utilizador guardado!");
    } catch (erro) {
      console.error("Erro ao guardar o utilizador:", erro);
    }
  };

  // Consultar as tarefas no SQLite
  const carregarTarefas = async () => {
    try {
      const resultados = await db.getAllAsync(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      );

      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler as tarefas:", erro);
    }
  };

  // Adicionar uma nova tarefa
  const adicionarTarefa = async () => {
    const descricao = novaTarefa.trim();

    if (descricao === "") {
      Alert.alert("Atenção", "Digite uma tarefa primeiro.");
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [descricao, 0]
      );

      setNovaTarefa("");
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
    }
  };

  // Eliminar uma tarefa pelo ID
  const excluirTarefa = async (id) => {
    try {
      await db.runAsync(
        "DELETE FROM tarefas WHERE id = ?;",
        [id]
      );

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao eliminar tarefa:", erro);
      Alert.alert("Erro", "Não foi possível eliminar a tarefa.");
    }
  };

  // Marcar ou desmarcar uma tarefa como concluída
  const alternarStatus = async (id, statusAtual) => {
    try {
      const novoStatus = statusAtual === 1 ? 0 : 1;

      await db.runAsync(
        "UPDATE tarefas SET concluida = ? WHERE id = ?;",
        [novoStatus, id]
      );

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.infoUsuario}>
          <Text style={styles.titulo}>
            Olá, {nomeUsuario.nome}!
          </Text>

          <Text style={styles.estadoUsuario}>
            {nomeUsuario.logado ? "Logado" : "Deslogado"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={salvarNome}
        >
          <Text style={styles.textoBotao}>
            Mudar Nome
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
          onSubmitEditing={adicionarTarefa}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.botaoAdd}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotao}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.linhaTarefa}>
            <TouchableOpacity
              style={styles.cartao}
              onPress={() =>
                alternarStatus(item.id, item.concluida)
              }
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.textoTarefa,
                  item.concluida === 1 &&
                    styles.textoConcluido,
                ]}
              >
                {item.concluida === 1 ? "✓ " : "○ "}
                {item.descricao}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() =>
                Alert.alert(
                  "Eliminar tarefa",
                  "Tem a certeza de que deseja eliminar esta tarefa?",
                  [
                    {
                      text: "Cancelar",
                      style: "cancel",
                    },
                    {
                      text: "Eliminar",
                      style: "destructive",
                      onPress: () => excluirTarefa(item.id),
                    },
                  ]
                )
              }
              accessibilityRole="button"
              accessibilityLabel={`Eliminar tarefa ${item.descricao}`}
            >
              <Text style={styles.textoExcluir}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Ainda não existem tarefas.
          </Text>
        }
      />
    </View>
  );
}

// Estilos da aplicação
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  infoUsuario: {
    flex: 1,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
    flexShrink: 1,
  },

  estadoUsuario: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  botaoAcao: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF",
  },

  botaoAdd: {
    backgroundColor: "#0064A0",
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold",
  },

  linhaTarefa: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  cartao: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginRight: 10,
  },

  textoTarefa: {
    fontSize: 18,
    color: "#333",
  },

  textoConcluido: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  botaoExcluir: {
    backgroundColor: "#E53935",
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  textoExcluir: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  listaVazia: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    fontSize: 16,
  },
});
