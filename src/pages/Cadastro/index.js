import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  Modal, KeyboardAvoidingView, Platform, Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const BotaoOpcao = ({ ativo, label, onPress }) => (
  <Pressable
    style={[styles.botaoOpcao, ativo && styles.botaoOpcaoAtivo]}
    onPress={onPress}
  >
    <Text style={[styles.textOpcao, ativo && styles.textOpcaoAtivo]}>
      {label}
    </Text>
  </Pressable>
);

const BotaoTipoSanguineo = ({ tipo, ativo, onPress }) => (
  <Pressable
    style={[styles.botaoTipo, ativo && styles.botaoTipoAtivo]}
    onPress={onPress}
  >
    <Text style={[styles.textTipo, ativo && styles.textTipoAtivo]}>
      {tipo}
    </Text>
  </Pressable>
);

const tiposSanguineos = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const calcularIdade = (dataNasc) => {
  const [dia, mes, ano] = dataNasc.split('/');
  const nascimento = new Date(`${ano}-${mes}-${dia}`);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
};

const formatarData = (texto) => {
  const numeros = texto.replace(/\D/g, '');
  if (numeros.length <= 2) return numeros;
  if (numeros.length <= 4) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4, 8)}`;
};

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');

  // ✅ Estados dos modais
  const [modalSucesso, setModalSucesso] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');
  const [metaCalculada, setMetaCalculada] = useState(0);

  const mostrarErro = (mensagem) => {
    setMensagemErro(mensagem);
    setModalErro(true);
  };

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !dataNascimento || !sexo || !peso || !altura || !tipoSanguineo) {
      mostrarErro('Por favor, preencha todos os campos!');
      return;
    }

    if (dataNascimento.length < 10) {
      mostrarErro('Data de nascimento inválida!');
      return;
    }

    const idade = calcularIdade(dataNascimento);
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const metaAgua = Math.round(pesoNum * 35);
    const alturaMts = alturaNum / 100;
    const imc = (pesoNum / (alturaMts * alturaMts)).toFixed(1);

    const usuario = {
      nome, email, senha, dataNascimento,
      idade, sexo,
      peso: pesoNum,
      altura: alturaNum,
      tipoSanguineo,
      metaAgua,
      imc,
    };

    Keyboard.dismiss();

    try {
      await AsyncStorage.setItem('@usuario_perfil', JSON.stringify(usuario));
      await AsyncStorage.setItem('@agua_meta', metaAgua.toString());
      setMetaCalculada(metaAgua);
      setModalSucesso(true); // ✅ Abre modal de sucesso
    } catch (error) {
      mostrarErro('Não foi possível salvar o cadastro.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      {/* ✅ MODAL DE SUCESSO */}
      <Modal animationType="fade" transparent={true} visible={modalSucesso}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>🎉</Text>
            <Text style={styles.modalTitulo}>Cadastro realizado!</Text>
            <Text style={styles.modalTexto}>
              Bem-vindo(a), {nome}!{'\n'}
              Sua meta diária de água é{'\n'}
              <Text style={styles.modalDestaque}>{metaCalculada}ml</Text>
            </Text>
            <Pressable
              style={styles.modalBotao}
              onPress={() => {
                setModalSucesso(false);
                navigation.replace('Login');
              }}
            >
              <Text style={styles.modalBotaoTexto}>Começar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ✅ MODAL DE ERRO */}
      <Modal animationType="fade" transparent={true} visible={modalErro}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalEmoji}>⚠️</Text>
            <Text style={styles.modalTitulo}>Atenção</Text>
            <Text style={styles.modalTexto}>{mensagemErro}</Text>
            <Pressable
              style={styles.modalBotao}
              onPress={() => setModalErro(false)}
            >
              <Text style={styles.modalBotaoTexto}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha seus dados para personalizar o app</Text>

        <Text style={styles.sectionTitle}>Dados Pessoais</Text>

        <Text style={styles.label}>Nome completo</Text>
        <TextInput style={styles.input} placeholder="Seu nome"
          value={nome} onChangeText={setNome} />

        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} placeholder="seu@email.com"
          keyboardType="email-address" autoCapitalize="none"
          value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="Mínimo 6 caracteres"
          secureTextEntry value={senha} onChangeText={setSenha} />

        <Text style={styles.label}>Data de nascimento</Text>
        <TextInput style={styles.input} placeholder="DD/MM/AAAA"
          keyboardType="numeric" maxLength={10}
          value={dataNascimento}
          onChangeText={(t) => setDataNascimento(formatarData(t))} />

        <Text style={styles.label}>Sexo</Text>
        <View style={styles.rowOpcoes}>
          <BotaoOpcao label="Masculino" ativo={sexo === 'M'} onPress={() => setSexo('M')} />
          <BotaoOpcao label="Feminino" ativo={sexo === 'F'} onPress={() => setSexo('F')} />
        </View>

        <Text style={styles.sectionTitle}>Dados de Saúde</Text>

        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput style={styles.input} placeholder="Ex: 70"
          keyboardType="numeric" value={peso} onChangeText={setPeso} />

        <Text style={styles.label}>Altura (cm)</Text>
        <TextInput style={styles.input} placeholder="Ex: 175"
          keyboardType="numeric" value={altura} onChangeText={setAltura} />

        <Text style={styles.label}>Tipo Sanguíneo</Text>
        <View style={styles.gridTipos}>
          {tiposSanguineos.map(tipo => (
            <BotaoTipoSanguineo
              key={tipo} tipo={tipo}
              ativo={tipoSanguineo === tipo}
              onPress={() => setTipoSanguineo(tipo)}
            />
          ))}
        </View>

        <Pressable style={styles.botaoCadastro} onPress={handleCadastro}>
          <Text style={styles.botaoCadastroText}>Criar minha conta</Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}