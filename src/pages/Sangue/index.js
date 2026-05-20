import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function SangueScreen() {
  const navigation = useNavigation();
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [carregando, setCarregando] = useState(true);
  const ROXO_VIBRANTE = '#9932cc';
  const VERDE_SUCESSO = '#22C55E';

  const tipos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // ✅ Busca o tipo sanguíneo ao abrir a tela
  useEffect(() => {
    carregarTipoSanguineo();
  }, []);

  const carregarTipoSanguineo = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem('@usuario_perfil');
      if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        setTipoSelecionado(usuario.tipoSanguineo || 'O+');
      }
    } catch (error) {
      console.warn('Erro ao carregar tipo sanguíneo:', error);
      setTipoSelecionado('O+'); // Fallback
    } finally {
      setCarregando(false);
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

      {/* Header Centralizado */}
      <View style={styles.header}>
        <Text style={styles.Title}>SANGUE</Text>
      </View>

      {/* Card de Visualização Atual */}
      <View style={styles.welcomeSection}>
        <MaterialCommunityIcons name="water" size={50} color={ROXO_VIBRANTE} />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.bloodLabelText}>TIPO ATUAL:</Text>
          <Text style={styles.bloodValueText}>{tipoSelecionado}</Text>
        </View>
      </View>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.welcomeText}>ALTERAR TIPO SANGUÍNEO:</Text>
      </View>

      {/* Grid de Seleção */}
      <FlatList
        data={tipos}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.rowGrid}
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => [
              styles.actionButton,
              { transform: [{ scale: pressed ? 0.95 : 1 }] }
            ]} 
            onPress={() => setTipoSelecionado(item)}
          >
            <View style={[
              styles.iconCircle, 
              tipoSelecionado === item && { borderColor: VERDE_SUCESSO, borderWidth: 2 }
            ]}>
              <Text style={[
                styles.bloodItemText, 
                tipoSelecionado === item && { color: ROXO_VIBRANTE }
              ]}>
                {item}
              </Text>
            </View>
          </Pressable>
        )}
      />

      {/* Botão Voltar Fixo na Base */}
      <View style={styles.buttonContainer}>
        <Pressable 
          style={({ pressed }) => [
            styles.buttonVoltar,
            { opacity: pressed ? 0.8 : 1 }
          ]} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}