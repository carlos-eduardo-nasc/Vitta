import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, Pressable, SafeAreaView, 
  StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function IMCS() {
  const navigation = useNavigation();
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [carregando, setCarregando] = useState(true);

  const ROXO_VIBRANTE = '#9932cc';

  // ✅ Carrega dados do usuário ao abrir a tela
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('@usuario_perfil');
      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        
        const pesoStr = usuario.peso ? usuario.peso.toString() : '';
        const alturaStr = usuario.altura ? usuario.altura.toString() : '';
        
        setPeso(pesoStr);
        setAltura(alturaStr);
        
        // ✅ Calcula IMC automaticamente
        if (usuario.peso && usuario.altura) {
          calcularIMC(pesoStr, alturaStr);
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const calcularIMC = (p_val, a_val) => {
    const p = parseFloat(p_val.toString().replace(',', '.'));
    const a = parseFloat(a_val.toString().replace(',', '.')) / 100;

    if (p > 0 && a > 0) {
      const valor = (p / (a * a)).toFixed(1);
      setImc(valor);

      if (valor < 18.5) setClassificacao('ABAIXO DO PESO');
      else if (valor < 25) setClassificacao('PESO NORMAL');
      else if (valor < 30) setClassificacao('SOBREPESO');
      else setClassificacao('OBESIDADE');
    } else {
      setImc(null);
      setClassificacao('');
    }
  };

  if (carregando) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={ROXO_VIBRANTE} />
        <Text style={{ marginTop: 10, color: '#666' }}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.Title}>IMC</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          
          {/* Card de Resultado */}
          <View style={styles.welcomeSection}>
            <MaterialCommunityIcons name="scale-bathroom" size={50} color={ROXO_VIBRANTE} />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.bloodLabelText}>SEU ÍNDICE:</Text>
              <Text style={styles.bloodValueText}>{imc || '--'}</Text>
              {classificacao ? (
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#22C55E', marginTop: 5 }}>
                  {classificacao}
                </Text>
              ) : null}
            </View>
          </View>

          {/* Inputs visíveis */}
          <View style={styles.rowGrid}>
            
            <View style={styles.actionButton}>
              <TextInput
                style={styles.iconCircle}
                keyboardType="numeric"
                value={peso}
                onChangeText={(val) => {
                  setPeso(val);
                  calcularIMC(val, altura);
                }}
                maxLength={5}
                placeholder="00.0"
                placeholderTextColor="#aaa"
                textAlign="center"
              />
              <Text style={styles.actionText}>PESO (KG)</Text>
            </View>

            <View style={styles.actionButton}>
              <TextInput
                style={styles.iconCircle}
                keyboardType="numeric"
                value={altura}
                onChangeText={(val) => {
                  setAltura(val);
                  calcularIMC(peso, val);
                }}
                maxLength={3}
                placeholder="000"
                placeholderTextColor="#aaa"
                textAlign="center"
              />
              <Text style={styles.actionText}>ALTURA (CM)</Text>
            </View>

          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable 
            style={({ pressed }) => [styles.buttonVoltar, { opacity: pressed ? 0.8 : 1 }]} 
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </Pressable>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}