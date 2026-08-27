import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import ItemTarefa from "./ItemTarefa"; 

export default function App() {
  const [tarefas, setTarefas] = useState([
    { id: 1, descricao: "Estudar ES6+", concluida: true },
    { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
    { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
    { id: 4, descricao: "Finalizar Roteiro de Pratica 02", concluida: false },
  ]);

  const adicionarTarefa = () => {
    const novaTarefa = {
      id: Math.random(),
      descricao: "Nova Tarefa Adicionada",
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
  };

  const tarefasPendentes = tarefas.filter((tarefa) => !tarefa.concluida);

  return (
   
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudoScroll}>
      
      <Text style={styles.titulo}>Lista de Tarefas</Text>
      {tarefas.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
      
      <Text style={[styles.titulo, styles.subtitulo]}>Tarefas Pendentes</Text>
      {tarefasPendentes.map((tarefa) => (
        <ItemTarefa 
          key={tarefa.id} 
          tarefa={tarefa} 
          estiloAdicional={styles.cardPendente} 
        />
      ))}

      <View style={styles.containerBotao}>
        <Button 
          title="Adicionar Tarefa" 
          onPress={adicionarTarefa} 
          color={styles.botao.color}/>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  conteudoScroll: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#1059e0",
  },
  subtitulo: {
    marginTop: 30,
    fontSize: 20,
    color: "#e65100",
  },
  cardPendente: {
    backgroundColor: "#ffe0b2", 
  },
  containerBotao: {
    marginTop: 20,
  },
  botao: {
    color: "#107be0",
  },
});
