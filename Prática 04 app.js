import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
export default function UrnaEletronica() {
// Criando estados independentes para cada candidato
const [votosA, setVotosA] = useState(0);
const [votosB, setVotosB] = useState(0);
const [votosC, setVotosC] = useState(0);
// Derivacao de Dados (nao precisa de um state separado)
const totalVotos = votosA + votosB + votosC;
// Funcao para zerar todos os estados simultaneamente
const zerarUrna = () => {
setVotosA(0);
setVotosB(0);
setVotosC(0);
};
return (
<View style={styles.container}>
<Text style={styles.titulo}>Painel de Votação</Text>
{/* Candidato A */}
<View style={styles.candidatoContainer}>
<Text style={styles.nomeCandidato}>Candidato A: {votosA} votos</Text>
<TouchableOpacity
style={styles.botaoVotar}
onPress={() => setVotosA(prev => prev + 1)}
>
<Text style={styles.textoBotao}>Votar em A</Text>
</TouchableOpacity>
</View>
{/* Candidato B */}
<View style={styles.candidatoContainer}>
<Text style={styles.nomeCandidato}>Candidato B: {votosB} votos</Text>
<TouchableOpacity
style={styles.botaoVotar}
onPress={() => setVotosB(prev => prev + 1)}>
<Text style={styles.textoBotao}>Votar em B</Text>
</TouchableOpacity>
</View>
{/* Candidato C */}
<View style={styles.candidatoContainer}>
<Text style={styles.nomeCandidato}>Candidato C: {votosC} votos</Text>
<TouchableOpacity
style={styles.botaoVotar}
onPress={() => setVotosC(prev => prev + 1)}>
<Text style={styles.textoBotao}>Votar em C</Text>
</TouchableOpacity>
</View> 
<View style={styles.rodape}>
<Text style={styles.totalTexto}>Total de Votos: {totalVotos}</Text>
<TouchableOpacity style={styles.botaoZerar} onPress={zerarUrna}>
<Text style={styles.textoBotao}>Zerar Urna</Text>
</TouchableOpacity>
</View>
</View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: "#F5F5F5",
justifyContent: "center",
alignItems: "center",
padding: 20,
},
titulo: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 30,
color: "#14325A", // ProBlue
},
candidatoContainer: {
width: "100%",
backgroundColor: "#FFF",
padding: 15,
borderRadius: 8,
marginBottom: 10,
alignItems: "center",
elevation: 2,
},
nomeCandidato: { 
fontSize: 18, 
marginBottom: 10 
},
botaoVotar: { 
backgroundColor: "#0080a0", 
padding: 10, 
borderRadius: 5, 
width:"80%", 
alignItems: "center" 
},
textoBotao: { 
color: "#FFF", 
fontWeight: "bold" 
},
rodape: { 
marginTop: 0, 
alignItems: "center", 
width: "90%", 
borderTopWidth: 1,
borderColor: "#CCC", 
paddingTop: 10 
},
totalTexto: { 
fontSize: 20, 
fontWeight: "bold", 
marginBottom: 15 
},
botaoZerar: { 
backgroundColor: "#0080a0",
padding: 10, 
borderRadius: 5 
},
});
