import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Pressable, Image, Modal,
  SafeAreaView, StatusBar, ScrollView, Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';

// Configuração de notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Remedio() {
  const navigation = useNavigation();
  const [foto, setFoto] = useState(null);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [horario, setHorario] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [remedioTemp, setRemedioTemp] = useState(null);

  const ROXO_VIBRANTE = '#9932cc';

  // ✅ Configuração inicial das notificações
  useEffect(() => {
    const setup = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();

        if (status !== "granted") {
          console.log("Permissão de notificação negada");
          return;
        }

        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync("default", {
            name: "Lembretes de Remédio",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#9932cc",
            sound: true,
          });
        }

        console.log("Notificações configuradas com sucesso!");
      } catch (error) {
        console.log("Erro ao configurar notificações:", error);
      }
    };

    setup();
  }, []);

  const solicitarPermissaoNotificacao = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Você precisa permitir notificações para receber lembretes!');
      return false;
    }
    return true;
  };

  const escolherDaGaleria = async () => {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      alert('Precisamos de permissão para acessar suas fotos!');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const tirarFoto = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      alert('Precisamos de permissão para usar a câmera!');
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const agendarNotificacao = async (remedio) => {
    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: '💊 Hora do Remédio!',
          body: `Está na hora de tomar ${remedio.nome} - ${remedio.dosagem}`,
          sound: true,
        },
        trigger: {
          type: "timeInterval",
          seconds: 5,
          repeats: false,
        },
      });

      console.log('Notificação agendada! ID:', id);
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }
  };

  const salvarRemedio = async () => {
    if (!nome || !quantidade || !dosagem) {
      alert('Preencha todos os campos!');
      return;
    }

    const remedio = {
      id: Date.now().toString(),
      foto,
      nome,
      quantidade,
      dosagem,
      horario: horario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      criadoEm: new Date().toISOString(),
    };

    setRemedioTemp(remedio);
    setModalConfirmacao(true);
  };

  const confirmarSalvamento = async () => {
    try {
      const remediosSalvos = await AsyncStorage.getItem('@remedios');
      const remedios = remediosSalvos ? JSON.parse(remediosSalvos) : [];

      remedios.push(remedioTemp);
      await AsyncStorage.setItem('@remedios', JSON.stringify(remedios));

      try {
        await agendarNotificacao(remedioTemp);
      } catch (error) {
        console.warn('Erro ao agendar notificação:', error);
      }

      setModalConfirmacao(false);
      alert('Remédio cadastrado com sucesso! 🎉\n\nVocê receberá uma notificação de teste em 5 segundos!');
      
      setFoto(null);
      setNome('');
      setQuantidade('');
      setDosagem('');
      setHorario(new Date());
      setRemedioTemp(null);

    } catch (error) {
      console.error('Erro ao salvar remédio:', error);
      alert('Erro ao salvar remédio!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>REMÉDIO</Text>
      </View>

      {/* MODAL DE CONFIRMAÇÃO */}
      <Modal animationType="fade" transparent={true} visible={modalConfirmacao}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Confirmar Cadastro</Text>
            
            {remedioTemp?.foto && (
              <Image source={{ uri: remedioTemp.foto }} style={styles.modalFoto} />
            )}
            
            <View style={styles.modalInfo}>
              <Text style={styles.modalLabel}>Remédio:</Text>
              <Text style={styles.modalValor}>{remedioTemp?.nome}</Text>
              
              <Text style={styles.modalLabel}>Quantidade:</Text>
              <Text style={styles.modalValor}>{remedioTemp?.quantidade}</Text>
              
              <Text style={styles.modalLabel}>Dosagem:</Text>
              <Text style={styles.modalValor}>{remedioTemp?.dosagem}</Text>
              
              <Text style={styles.modalLabel}>Horário da notificação:</Text>
              <Text style={styles.modalValor}>{remedioTemp?.horario}</Text>
            </View>

            <View style={styles.modalBotoes}>
              <Pressable
                style={[styles.modalBotao, styles.modalBotaoCancelar]}
                onPress={() => {
                  setModalConfirmacao(false);
                  setRemedioTemp(null);
                }}
              >
                <Text style={styles.modalBotaoTexto}>Cancelar</Text>
              </Pressable>
              
              <Pressable
                style={[styles.modalBotao, styles.modalBotaoConfirmar]}
                onPress={confirmarSalvamento}
              >
                <Text style={styles.modalBotaoTexto}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.fotoContainer}>
          {foto ? (
            <Image source={{ uri: foto }} style={styles.foto} />
          ) : (
            <View style={styles.fotoPlaceholder}>
              <MaterialCommunityIcons name="pill" size={60} color="#ccc" />
              <Text style={styles.fotoPlaceholderText}>Foto do remédio</Text>
            </View>
          )}
        </View>

        <View style={styles.fotoBotoes}>
          <Pressable style={styles.fotoBotao} onPress={tirarFoto}>
            <MaterialCommunityIcons name="camera" size={24} color={ROXO_VIBRANTE} />
            <Text style={styles.fotoBotaoTexto}>Câmera</Text>
          </Pressable>
          <Pressable style={styles.fotoBotao} onPress={escolherDaGaleria}>
            <MaterialCommunityIcons name="image" size={24} color={ROXO_VIBRANTE} />
            <Text style={styles.fotoBotaoTexto}>Galeria</Text>
          </Pressable>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome do Remédio</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Paracetamol"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 1 comprimido"
            value={quantidade}
            onChangeText={setQuantidade}
          />

          <Text style={styles.label}>Dosagem</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 500mg"
            value={dosagem}
            onChangeText={setDosagem}
          />

          <Text style={styles.label}>Horário da Notificação</Text>
          <Text style={styles.sublabel}>
            {Platform.OS === 'web' ? 'Selecione o horário' : 'Toque para selecionar o horário'}
          </Text>

          {Platform.OS === 'web' ? (
            // ✅ Web: input HTML nativo
            <input
              type="time"
              value={horario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              onChange={(e) => {
                const [hour, minute] = e.target.value.split(':');
                const newDate = new Date();
                newDate.setHours(parseInt(hour));
                newDate.setMinutes(parseInt(minute));
                setHorario(newDate);
              }}
              style={{
                width: '100%',
                padding: 15,
                fontSize: 16,
                borderRadius: 12,
                border: '1px solid #E5E7EB',
                backgroundColor: '#F9FAFB',
                fontFamily: 'system-ui',
              }}
            />
          ) : (
            // ✅ Mobile: DateTimePicker
            <>
              <Pressable
                style={styles.horarioButton}
                onPress={() => setMostrarPicker(true)}
              >
                <MaterialCommunityIcons name="clock-outline" size={24} color={ROXO_VIBRANTE} />
                <Text style={styles.horarioTexto}>
                  {horario.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#9CA3AF" />
              </Pressable>

              {mostrarPicker && (
                <DateTimePicker
                  value={horario}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setMostrarPicker(Platform.OS === 'ios');
                    if (selectedDate) setHorario(selectedDate);
                  }}
                />
              )}
            </>
          )}
        </View>

        <Pressable style={styles.botaoSalvar} onPress={salvarRemedio}>
          <Text style={styles.botaoSalvarTexto}>Salvar Remédio</Text>
        </Pressable>

      </ScrollView>

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