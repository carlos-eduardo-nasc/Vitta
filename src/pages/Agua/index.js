import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Modal, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'; //TouchableWithoutFeedback faz o teclado fechar quando clica fora dele
import Svg, { Circle } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const CHAVE_TOTAL = '@agua_total';
const CHAVE_HISTORICO = '@agua_historico';
const META_DIARIA = 2000;

const CircularProgressCustom = ({ progress }) => {
  const size = 180;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(progress, 100);
  const progressStroke = circumference - (circumference * clampedProgress) / 100;

  return (
    <View style={styles.chartContainer}>
      <Svg width={size} height={size}>
        <Circle stroke="#E5E7EB" fill="none" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <Circle
          stroke="#9932cc"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={progressStroke}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.textOverlay}>
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        <Text style={styles.subtitle}>Meta diária</Text>
      </View>
    </View>
  );
};

export default function Agua({ navigation }) {
  const [quantidade, setQuantidade] = useState('');
  const [totalAgua, setTotalAgua] = useState(0);
  const [historico, setHistorico] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [historicoVisible, setHistoricoVisible] = useState(false);
  const [ultimoRegistro, setUltimoRegistro] = useState(0); // 🔧 Corrige bug do modal

  // ✅ Carrega os dados salvos quando a tela abre
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const totalSalvo = await AsyncStorage.getItem(CHAVE_TOTAL);
      const historicoSalvo = await AsyncStorage.getItem(CHAVE_HISTORICO);

      if (totalSalvo !== null) setTotalAgua(parseFloat(totalSalvo));
      if (historicoSalvo !== null) setHistorico(JSON.parse(historicoSalvo));
    } catch (error) {
      console.warn('Erro ao carregar dados:', error);
    }
  };

  const handleSalvar = async () => {
    const valorNum = parseFloat(quantidade);

    if (valorNum > 0) {
      const novoTotal = totalAgua + valorNum;
      const novoRegistro = {
        id: Math.random().toString(),
        valor: valorNum,
        hora: new Date().toLocaleTimeString().substring(0, 5),
      };
      const novoHistorico = [novoRegistro, ...historico];

      // ✅ Salva no AsyncStorage
      try {
        await AsyncStorage.setItem(CHAVE_TOTAL, novoTotal.toString());
        await AsyncStorage.setItem(CHAVE_HISTORICO, JSON.stringify(novoHistorico));
      } catch (error) {
        console.warn('Erro ao salvar dados:', error);
      }

      setUltimoRegistro(valorNum); // 🔧 Corrige bug do modal
      setTotalAgua(novoTotal);
      setHistorico(novoHistorico);
      setModalVisible(true);
      Keyboard.dismiss();
      setQuantidade(''); // 🔧 Limpa o input antes de abrir o modal
    }
  };

  const porcentagemAtual = (totalAgua / META_DIARIA) * 100;

  return (
    <View style={styles.container}>

      {/* MODAL DE SUCESSO */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sucesso!</Text>
            <Text style={styles.modalMessage}>
              Você registrou {ultimoRegistro}ml. {/* 🔧 Usando ultimoRegistro */}
              Total: {totalAgua}ml
            </Text>
            <Pressable style={[styles.button, styles.buttonSave]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Ok, entendi!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* MODAL DE HISTÓRICO */}
      <Modal animationType="slide" transparent={true} visible={historicoVisible}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '90%', maxHeight: '70%' }]}>
            <Text style={styles.modalTitle}>Consumo Diário</Text>
            <ScrollView style={{ width: '100%', marginVertical: 15 }}>
              {historico.length === 0 ? (
                <Text style={{ textAlign: 'center', color: '#666' }}>Nenhum registro.</Text>
              ) : (
                historico.map(item => (
                  <View key={item.id} style={styles.historyItem}>
                    <Text style={styles.historyText}>{item.valor}ml</Text>
                    <Text style={styles.historyTime}>{item.hora}</Text>
                  </View>
                ))
              )}
            </ScrollView>
            <Pressable style={[styles.button, styles.buttonSecondary]} onPress={() => setHistoricoVisible(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>CONSUMO DE ÁGUA</Text>
      <CircularProgressCustom progress={porcentagemAtual} />

      <View style={styles.inputSection}>
        <Text style={styles.label}>Insira a quantidade ingerida (ml):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 500"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />
        <Pressable style={styles.buttonReg} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Registrar Água</Text>
        </Pressable>
      </View>

      <Pressable style={styles.historicoButton} onPress={() => setHistoricoVisible(true)}>
        <Text style={styles.historicoText}>
          Visualizar <Text style={styles.historicoLink}>Histórico</Text>
        </Text>
      </Pressable>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonVoltar} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
      </View>
    </View>
);
}