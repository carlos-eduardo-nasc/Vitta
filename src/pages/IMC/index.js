import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  SafeAreaView, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform,  
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

export default function IMCS() {
  const navigation = useNavigation();
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  // Referências para "esconder" o input e focar via código
  const pesoInputRef = useRef(null);
  const alturaInputRef = useRef(null);

  const ROXO_VIBRANTE = '#9932cc';

  // Função de Toque nos Cards
  const focarInput = (ref) => {
    if (ref.current) {
      ref.current.focus(); // Força o teclado a abrir
    }
  };

  const calcularIMC = (p_val, a_val) => {
    // Converte vírgula para ponto e transforma em número
    const p = parseFloat(p_val.replace(',', '.'));
    const a = parseFloat(a_val.replace(',', '.')) / 100; // Converte CM para Metros

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

  return (

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Header Centralizado */}
        <View style={styles.header}>
          <Text style={styles.Title}>IMC</Text>
        </View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <View style={{ paddingHorizontal: 20, flex: 1 }}>
            
            {/* Card de Resultado Superior (Estilo Welcome) */}
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

            {/* Grid de Cards de Toque (Visual 80x80) */}
            <View style={styles.rowGrid}>
              
              {/* CARD PESO (Clique aqui foca o input invisível) */}
              <View style={styles.actionButton}>
                <Pressable style={styles.iconCircle} onPress={() => focarInput(pesoInputRef)}>
                  {/* O texto digitado aparece aqui, no centro */}
                  <Text style={styles.cardValueText}>{peso || '00.0'}</Text>
                </Pressable>
                <Text style={styles.actionText}>PESO (KG)</Text>
              </View>

              {/* CARD ALTURA */}
              <View style={styles.actionButton}>
                <Pressable style={styles.iconCircle} onPress={() => focarInput(alturaInputRef)}>
                  {/* O texto digitado aparece aqui, no centro */}
                  <Text style={styles.cardValueText}>{altura || '000'}</Text>
                </Pressable>
                <Text style={styles.actionText}>ALTURA (CM)</Text>
              </View>

            </View>
          </View>

          {/* Botão Voltar Fixo na Base */}
          <View style={styles.buttonContainer}>
            <Pressable 
              style={({ pressed }) => [styles.buttonVoltar, { opacity: pressed ? 0.8 : 1 }]} 
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </Pressable>
          </View>

          {/* INPUTS INVISÍVEIS (Escondidos na base, servem apenas para abrir o teclado) */}
          <TextInput
            ref={pesoInputRef}
            style={styles.hiddenInput}
            keyboardType="numeric"
            value={peso}
            onChangeText={(val) => {
              setPeso(val);
              calcularIMC(val, altura);
            }}
            maxLength={5}
          />
          <TextInput
            ref={alturaInputRef}
            style={styles.hiddenInput}
            keyboardType="numeric"
            value={altura}
            onChangeText={(val) => {
              setAltura(val);
              calcularIMC(peso, val);
            }}
            maxLength={3}
          />

        </KeyboardAvoidingView>
      </SafeAreaView>

  );
}