import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable,
  Alert, KeyboardAvoidingView, Platform, Image, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha e-mail e senha!');
      return;
    }

    try {
      const usuarioSalvo = await AsyncStorage.getItem('@usuario_perfil');
      if (!usuarioSalvo) {
        Alert.alert('Erro', 'Nenhum cadastro encontrado. Crie uma conta!');
        return;
      }

      const usuario = JSON.parse(usuarioSalvo);

      if (usuario.email === email && usuario.senha === senha) {
        navigation.replace('Home');
      } else {
        Alert.alert('Erro', 'E-mail ou senha incorretos!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* LOGO */}
        <Image
          source={require('../../../assets/logoVitta.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Bem-vindo(a) de volta!</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        {/* FORMULÁRIO */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        {/* BOTÃO LOGIN */}
        <Pressable style={styles.botaoLogin} onPress={handleLogin}>
          <Text style={styles.botaoLoginText}>Entrar</Text>
        </Pressable>

        {/* LINK CADASTRO */}
        <Pressable onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.linkCadastro}>
            Não tem conta?{' '}
            <Text style={styles.linkCadastroDestaque}>Cadastre-se</Text>
          </Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}