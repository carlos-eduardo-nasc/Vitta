import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, SafeAreaView, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  MaterialIcons, 
  Ionicons, 
  FontAwesome5, 
  Entypo,
  MaterialCommunityIcons 
} from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function Home() {
  const navigation = useNavigation();
  const ROXO_PREENCHIDO = '#9932cc';
  const [nomeUsuario, setNomeUsuario] = useState('');

  // ✅ Busca o nome do usuário cadastrado
  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem('@usuario_perfil');
        if (usuarioSalvo) {
          const usuario = JSON.parse(usuarioSalvo);
          setNomeUsuario(usuario.nome);
        }
      } catch (error) {
        console.warn('Erro ao carregar usuário:', error);
      }
    };
    carregarUsuario();
  }, []);

  const handleNavigation = (routeName) => {
    try {
      navigation.navigate(routeName);
    } catch (error) {
      console.warn(`A rota ${routeName} ainda não existe no App.js!`);
    }
  };

  const acoes = [
    { id: '1', nome: 'SANGUE', icone: 'bloodtype', library: 'MaterialIcons', route: 'Sangue' },     
    { id: '2', nome: 'ÁGUA', icone: 'drop', library: 'Entypo', route: 'Agua' },         
    { id: '3', nome: 'REMÉDIO', icone: 'pill', library: 'MaterialCommunityIcons', route: 'Remedio' },
    { id: '4', nome: 'ALERGIAS', icone: 'hand-paper', library: 'FontAwesome5', route: 'Alergias' },
    { id: '5', nome: 'GLICEMIA', icone: 'opacity', library: 'MaterialIcons', route: 'Glicemia' },    
    { id: '6', nome: 'PRESSÃO', icone: 'heart-pulse', library: 'MaterialCommunityIcons', route: 'Pressao' },
    { id: '7', nome: 'IMC', icone: 'weight', library: 'FontAwesome5', route: 'IMC' },
    { id: '8', nome: 'VACINAS', icone: 'needle', library: 'MaterialCommunityIcons', route: 'Vacinas' },
    { id: '9', nome: 'MEDITAÇÃO', icone: 'self-improvement', library: 'MaterialIcons', route: 'Meditacao' },
    { id: '10', nome: 'FRUTA', icone: 'food-apple', library: 'MaterialCommunityIcons', route: 'Fruta' },
    { id: '11', nome: 'DICA', icone: 'lightbulb-outline', library: 'MaterialCommunityIcons', route: 'Dica' },
    { id: '12', nome: 'EMERGÊNCIA', icone: 'bell-outline', library: 'MaterialCommunityIcons', route: 'Emergencia' },
  ];

  const IconeAcao = ({ library, name }) => {
    const size = 45;
    const color = ROXO_PREENCHIDO;
    if (library === 'MaterialIcons') return <MaterialIcons name={name} size={size} color={color} />;
    if (library === 'Ionicons') return <Ionicons name={name} size={size} color={color} />;
    if (library === 'FontAwesome5') return <FontAwesome5 name={name} size={size} color={color} />;
    if (library === 'MaterialCommunityIcons') return <MaterialCommunityIcons name={name} size={size} color={color} />;
    if (library === 'Entypo') return <Entypo name={name} size={size} color={color} />;
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.vittaTitle}>VITTA</Text>
        <View style={styles.headerIcons}>
          <MaterialCommunityIcons name="account-circle" size={24} color="#A3A3A3" />
          <MaterialCommunityIcons name="help-circle-outline" size={24} color="#A3A3A3" style={{ marginLeft: 15 }} />
        </View>
      </View>

      <View style={styles.welcomeCard}>
        <Image 
          source={{ uri: 'https://i.pinimg.com/736x/b4/8e/90/b48e908ed5e7960c9739090f88259c99.jpg' }}
          style={styles.avatarCircle} 
        />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeTextGreeting}>Olá,</Text>
          {/* ✅ Nome dinâmico do cadastro */}
          <Text style={styles.welcomeTextName}>{nomeUsuario || 'Usuário'}!</Text>
        </View>
      </View>

      <FlatList
        data={acoes}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.rowGrid}
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => [
              styles.actionButton,
              { transform: [{ scale: pressed ? 0.96 : 1 }] }
            ]} 
            onPress={() => handleNavigation(item.route)}
          >
            <View style={styles.iconCircle}>
              <IconeAcao library={item.library} name={item.icone} />
            </View>
            <Text style={styles.actionText}>{item.nome}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}