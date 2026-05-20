import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable,
  KeyboardAvoidingView, Platform, Image, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import styles from './styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Preencha e-mail e senha!');
      return;
    }

    try {
      const response = await api.post('/login', { email, senha });

      if (!response.data || !response.data.usuario) {
        alert('Erro ao processar login');
        return;
      }

      const usuario = response.data.usuario;

      await AsyncStorage.setItem('@usuario_perfil', JSON.stringify(usuario));
      
      if (usuario.metaAgua) {
        await AsyncStorage.setItem('@agua_meta', usuario.metaAgua.toString());
      }
      
      navigation.replace('Home');
    } catch (error) {
      console.error('Erro completo:', error);
      if (error.response?.status === 401) {
        alert('E-mail ou senha incorretos!');
      } else {
        alert('Não foi possível fazer login');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/logoVitta.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Bem-vindo(a) de volta!</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

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

        <Pressable style={styles.botaoLogin} onPress={handleLogin}>
          <Text style={styles.botaoLoginText}>Entrar</Text>
        </Pressable>

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