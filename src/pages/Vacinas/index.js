import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, SafeAreaView, StatusBar, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

export default function VacinasScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const ROXO_VIBRANTE = '#9932cc';

  const categorias = [
    { id: '1', title: 'HOMEM', icon: 'human-male' },
    { id: '2', title: 'MULHER', icon: 'human-female' },
    { id: '3', title: 'CRIANÇA', icon: 'baby-face-outline' },
    { id: '4', title: 'GESTANTE', icon: 'human-pregnant' },
  ];

  const dadosVacinas = {
    'HOMEM': [
    'Hepatite B', 
    'Dupla Adulta (DT - Difteria e Tétano)', 
    'Febre Amarela', 
    'Tríplice Viral (Sarampo, Caxumba e Rubéola)', 
    'HPV (até os 14 anos ou em condições especiais)', 
    'Gripe (Influenza - Anual)', 
    'COVID-19', 
    'Pneumocócica (para grupos de risco ou 60+)'],

    'MULHER': ['Hepatite B',
    'Dupla Adulta (DT - Difteria e Tétano)',
    'Tríplice Viral (Sarampo, Caxumba e Rubéola)',
    'Febre Amarela',
    'HPV (9 a 14 anos)',
    'Gripe (Influenza - Anual)',
    'COVID-19'],

    'CRIANÇA': ['BCG (Tuberculose)',
    'Hepatite B',
    'Pentavalente (Difteria, Tétano, Coqueluche, Hep B e Hib)',
    'Polio Inativada (VIP)',
    'Polio Oral (VOP)',
    'Pneumocócica 10-Valente',
    'Rotavírus Humano',
    'Meningocócica C',
    'Febre Amarela',
    'Tríplice Viral',
    'Tetraviral (Sarampo, Caxumba, Rubéola e Varicela)',
    'DTP (Difteria, Tétano e Coqueluche)',
    'Hepatite A',
    'HPV (Meninos e Meninas de 9 a 14 anos)'],

    'GESTANTE': ['Hepatite B',
    'Dupla Adulta (DT - Difteria e Tétano)',
    'dTpa (Difteria, Tétano e Coqueluche acelular) - A partir da 20ª semana',
    'Gripe (Influenza)',
    'COVID-19'],

  };

  const abrirModal = (categoria) => {
    setCategoriaSelecionada(categoria);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header Centralizado */}
      <View style={styles.header}>
        <Text style={styles.Title}>VACINAS</Text>
      </View>

      <View style={{ alignItems: 'center', marginBottom: 30, marginTop: 10 }}>
        <Text style={styles.welcomeText}>SELECIONE UMA CATEGORIA:</Text>
      </View>

      {/* Grid de Categorias */}
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        numColumns={2} // Ajustado para 2 colunas para ícones maiores
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.rowGrid}
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => [
              styles.actionButton,
              { transform: [{ scale: pressed ? 0.95 : 1 }] }
            ]} 
            onPress={() => abrirModal(item.title)}
          >
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name={item.icon} size={40} color={ROXO_VIBRANTE} />
            </View>
            <Text style={styles.actionText}>{item.title}</Text>
          </Pressable>
        )}
      />

      {/* Modal de Vacinas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>VACINAS: {categoriaSelecionada}</Text>
            
            <ScrollView style={{ width: '100%', marginVertical: 15 }}>
              {categoriaSelecionada && dadosVacinas[categoriaSelecionada].map((vacina, index) => (
                <View key={index} style={styles.vacinaItem}>
                  <MaterialCommunityIcons name="check-circle" size={20} color="#22C55E" />
                  <Text style={styles.vacinaText}>{vacina}</Text>
                </View>
              ))}
            </ScrollView>

            <Pressable 
              style={[styles.buttonFechar, { width: '100%' }]} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>FECHAR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Botão Voltar Fixo */}
      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.buttonVoltar} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}