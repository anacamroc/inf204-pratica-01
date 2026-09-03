import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function JogoDaVelha() {
  const [casas, setCasas] = useState(Array(9).fill(null));
  const [vez, setVez] = useState("X");
  const [vencedor, setVencedor] = useState(null);

  const jogar = (index) => {
    if (casas[index] !== null || vencedor !== null) {
      return;
    }

    const novasCasas = [...casas];
    novasCasas[index] = vez;

    setCasas(novasCasas);

    const combinacoes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combinacao of combinacoes) {
      const [a, b, c] = combinacao;

      if (
        novasCasas[a] &&
        novasCasas[a] === novasCasas[b] &&
        novasCasas[a] === novasCasas[c]
      ) {
        setVencedor(vez);
        return;
      }
    }

    if (!novasCasas.includes(null)) {
      setVencedor("Empate");
      return;
    }

    setVez(vez === "X" ? "O" : "X");
  };

  const reiniciar = () => {
    setCasas(Array(9).fill(null));
    setVez("X");
    setVencedor(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>

      {vencedor === "X" || vencedor === "O" ? (
        <Text style={styles.vencedor}>
          🏆 Jogador {vencedor} venceu!
        </Text>
      ) : vencedor === "Empate" ? (
        <Text style={styles.empate}>
          🤝 Empate!
        </Text>
      ) : (
        <Text style={styles.vez}>
          Vez do jogador: {vez}
        </Text>
      )}

      <View style={styles.tabuleiro}>
        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(0)}
          >
            <Text style={styles.simbolo}>{casas[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(1)}
          >
            <Text style={styles.simbolo}>{casas[1]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(2)}
          >
            <Text style={styles.simbolo}>{casas[2]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(3)}
          >
            <Text style={styles.simbolo}>{casas[3]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(4)}
          >
            <Text style={styles.simbolo}>{casas[4]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(5)}
          >
            <Text style={styles.simbolo}>{casas[5]}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linha}>
          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(6)}
          >
            <Text style={styles.simbolo}>{casas[6]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(7)}
          >
            <Text style={styles.simbolo}>{casas[7]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.celula}
            onPress={() => jogar(8)}
          >
            <Text style={styles.simbolo}>{casas[8]}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={reiniciar}
      >
        <Text style={styles.textoBotao}>
          Reiniciar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A",
    marginBottom: 10,
  },

  vez: {
    fontSize: 18,
    color: "#505050",
    marginBottom: 15,
  },

  vencedor: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 15,
  },

  empate: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
    marginBottom: 15,
  },

  tabuleiro: {
    flexDirection: "column",
    borderWidth: 2,
    borderColor: "#14325A",
  },

  linha: {
    flexDirection: "row",
  },

  celula: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "#14325A",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  simbolo: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#0088a0",
  },

  botao: {
    marginTop: 20,
    backgroundColor: "#009ba0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
