import { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, TextInput, Button, Alert, } from 'react-native';

import api from './api';

export default function App() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tela, setTela] = useState('lista');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  // Buscar dados da API
  async function buscarDados() {
    setLoading(true);

    try {
      const resposta = await api.get('/users');
      setDados(resposta.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    } finally {
      setLoading(false);
    }
  }

  // Carregar dados ao abrir o aplicativo
  useEffect(() => {
    buscarDados();
  }, []);

  // Enviar formulário com POST
  async function enviarFormulario() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Atenção', 'Preencha o nome e o email.');
      return;
    }

    try {
      const resposta = await api.post('/users', {
        name: nome,
        email: email,
      });

      Alert.alert(
        'Sucesso',
        'Utilizador criado! ID: ' + resposta.data.id
      );

      setNome('');
      setEmail('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o formulário.');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.botoes}>
        <Button
          title="Lista de utilizadores"
          onPress={() => setTela('lista')}
        />

        <Button
          title="Formulário"
          onPress={() => setTela('formulario')}
        />
      </View>

      {tela === 'lista' ? (
        <>
          <Text style={styles.titulo}>Utilizadores</Text>

          {loading && dados.length === 0 ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <FlatList
              data={dados}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text>Nome: {item.name}</Text>
                  <Text>Email: {item.email}</Text>
                </View>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={buscarDados}
                />
              }
            />
          )}
        </>
      ) : (
        <View style={styles.formulario}>
          <Text style={styles.titulo}>Novo utilizador</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button
            title="Enviar formulário"
            onPress={enviarFormulario}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  botoes: {
    gap: 10,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  formulario: {
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },
});
