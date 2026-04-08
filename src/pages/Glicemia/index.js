import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const STORAGE_KEY = '@glicemia_registros_v1';

const CONTEXTOS = [
  { id: '1', title: 'JEJUM', icon: 'food-off' },
  { id: '2', title: 'PÓS REFEIÇÃO', icon: 'food' },
  { id: '3', title: 'AO DORMIR', icon: 'weather-night' },
  { id: '4', title: 'OUTRO', icon: 'dots-horizontal-circle-outline' },
];

function gerarId() {
  return Math.random().toString(36).slice(2, 10);
}

function formatarData(iso) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

export default function GlicemiaScreen() {
  const navigation = useNavigation();
  const ROXO_VIBRANTE = '#9932cc';

  const [modalAdicionarVisible, setModalAdicionarVisible] = useState(false);
  const [modalHistoricoVisible, setModalHistoricoVisible] = useState(false);

  const [contextoSelecionado, setContextoSelecionado] = useState(CONTEXTOS[0].title);
  const [valorTxt, setValorTxt] = useState('');
  const [observacao, setObservacao] = useState('');

  const [registros, setRegistros] = useState([]);

  const ultimaMedicao = useMemo(() => {
    if (!registros?.length) return null;
    const ordenado = [...registros].sort((a, b) => (a.dataISO < b.dataISO ? 1 : -1));
    return ordenado[0];
  }, [registros]);

  async function salvarNoStorage(lista) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  }

  async function carregar() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : [];
      setRegistros(Array.isArray(data) ? data : []);
    } catch {
      Alert.alert('Erro', 'Não consegui carregar os registros de glicemia.');
      setRegistros([]);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function abrirModalAdicionar(contextoTitle) {
    setContextoSelecionado(contextoTitle);
    setValorTxt('');
    setObservacao('');
    setModalAdicionarVisible(true);
  }

  async function adicionarRegistro() {
    const valor = Number(valorTxt);

    if (!valorTxt || Number.isNaN(valor) || valor <= 0) {
      Alert.alert('Atenção', 'Digite um valor válido em mg/dL. Ex: 95');
      return;
    }

    const novo = {
      id: gerarId(),
      valor,
      contexto: contextoSelecionado,
      observacao: observacao?.trim() || '',
      dataISO: new Date().toISOString(),
    };

    const novaLista = [novo, ...registros].sort((a, b) => (a.dataISO < b.dataISO ? 1 : -1));
    setRegistros(novaLista);
    await salvarNoStorage(novaLista);

    setModalAdicionarVisible(false);
  }

  async function removerRegistro(id) {
    Alert.alert('Excluir', 'Deseja excluir este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const novaLista = registros.filter((r) => r.id !== id);
          setRegistros(novaLista);
          await salvarNoStorage(novaLista);
        },
      },
    ]);
  }

  function renderRegistro({ item }) {
    return (
      <View style={styles.registroCard}>
        <View style={styles.registroTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.registroValor}>{item.valor} mg/dL</Text>
            <Text style={styles.registroSub}>
              {item.contexto} • {formatarData(item.dataISO)}
            </Text>
          </View>
        </View>

        {!!item.observacao && <Text style={styles.registroObs}>{item.observacao}</Text>}

        <Pressable onPress={() => removerRegistro(item.id)} style={{ alignSelf: 'flex-end' }}>
          <Text style={styles.excluirText}>Excluir</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.Title}>GLICEMIA</Text>
      </View>

      {/* Card simples (igual ideia do Sangue: mostra última medição, mas sem complicar) */}
      <View style={styles.welcomeSection}>
        <MaterialCommunityIcons name="medical-bag" size={50} color={ROXO_VIBRANTE} />
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.bloodLabelText}>ÚLTIMA MEDIÇÃO:</Text>
          <Text style={styles.bloodValueText}>
            {ultimaMedicao ? `${ultimaMedicao.valor} mg/dL` : '—'}
          </Text>
          {ultimaMedicao && (
            <Text style={styles.statusLinha}>
              {ultimaMedicao.contexto} • {formatarData(ultimaMedicao.dataISO)}
            </Text>
          )}
        </View>
      </View>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.welcomeText}>ADICIONAR MEDIÇÃO:</Text>
      </View>

      {/* Grid de Contextos */}
      <FlatList
        data={CONTEXTOS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.rowGrid}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              { transform: [{ scale: pressed ? 0.95 : 1 }] },
            ]}
            onPress={() => abrirModalAdicionar(item.title)}
          >
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name={item.icon} size={40} color={ROXO_VIBRANTE} />
            </View>
            <Text style={styles.actionText}>{item.title}</Text>
          </Pressable>
        )}
      />

      {/* Link igual Água */}
      <View style={styles.linkWrap}>
        <Text style={styles.linkText}>
          Visualizar{' '}
          <Text style={styles.linkDestaque} onPress={() => setModalHistoricoVisible(true)}>
            Histórico
          </Text>
        </Text>
      </View>

      {/* Modal: adicionar medição (sem preview de status) */}
      <Modal
        animationType="slide"
        transparent
        visible={modalAdicionarVisible}
        onRequestClose={() => setModalAdicionarVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NOVA MEDIÇÃO • {contextoSelecionado}</Text>

            <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps="handled">
              <Text style={styles.label}>Valor (mg/dL)</Text>
              <TextInput
                value={valorTxt}
                onChangeText={setValorTxt}
                keyboardType="numeric"
                placeholder="Ex: 95"
                style={styles.input}
              />

              <Text style={styles.label}>Observação (opcional)</Text>
              <TextInput
                value={observacao}
                onChangeText={setObservacao}
                placeholder="Ex: depois do almoço"
                style={[styles.input, { height: 90, textAlignVertical: 'top' }]}
                multiline
              />
            </ScrollView>

            <View style={{ width: '100%', gap: 10 }}>
              <Pressable style={[styles.buttonSalvar, { width: '100%' }]} onPress={adicionarRegistro}>
                <Text style={styles.buttonText}>REGISTRAR</Text>
              </Pressable>

              <Pressable
                style={[styles.buttonCancel, { width: '100%' }]}
                onPress={() => setModalAdicionarVisible(false)}
              >
                <Text style={styles.buttonTextCancel}>CANCELAR</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Modal: histórico (igual a ideia da Água) */}
      <Modal
        animationType="slide"
        transparent
        visible={modalHistoricoVisible}
        onRequestClose={() => setModalHistoricoVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentHistorico}>
            <Text style={styles.modalTitle}>HISTÓRICO</Text>

            <FlatList
              data={[...registros].sort((a, b) => (a.dataISO < b.dataISO ? 1 : -1))}
              keyExtractor={(item) => item.id}
              renderItem={renderRegistro}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhum registro ainda.</Text>
              }
              style={{ width: '100%' }}
              contentContainerStyle={{ paddingBottom: 10 }}
            />

            <Pressable
              style={[styles.buttonFechar, { width: '100%' }]}
              onPress={() => setModalHistoricoVisible(false)}
            >
              <Text style={styles.buttonText}>FECHAR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Botão Voltar fixo */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [styles.buttonVoltar, { opacity: pressed ? 0.8 : 1 }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}