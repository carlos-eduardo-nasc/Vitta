import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { styles } from './styles';

const API_KEY = 'gxudtfONhbx0rzCVA3Pyak5SLwbHGq2ZWgdjJdbW';

export default function FrutaScreen() {
  const navigation = useNavigation();
  const ROXO_VIBRANTE = '#9932cc';

  const [fruta, setFruta] = useState('');
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const buscarFruta = async () => {
    const query = fruta.trim();
    if (!query) {
      setErro('Digite o nome da fruta.');
      setDados(null);
      return;
    }

    setLoading(true);
    setErro('');
    setDados(null);

    try {
      const buscaResp = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
        params: { query, api_key: API_KEY },
      });

      const resultadoBusca = buscaResp.data;

      if (!resultadoBusca?.foods || resultadoBusca.foods.length === 0) {
        setErro('Fruta não encontrada.');
        return;
      }

      const alimento = resultadoBusca.foods[0];

      const detalheResp = await axios.get(
        `https://api.nal.usda.gov/fdc/v1/food/${alimento.fdcId}`,
        { params: { api_key: API_KEY } }
      );

      const resultadoDetalhe = detalheResp.data;
      const nutrientes = resultadoDetalhe?.foodNutrients || [];

      const pegarNutriente = (nome) => {
        const item = nutrientes.find(
          (n) => n?.nutrient?.name?.toLowerCase() === nome.toLowerCase()
        );
        if (!item || item.amount == null) return 'Não informado';
        const unidade = item?.nutrient?.unitName ? ` ${item.nutrient.unitName}` : '';
        return `${item.amount}${unidade}`;
      };

      setDados({
        nome: resultadoDetalhe?.description || query,
        calorias: pegarNutriente('Energy'),
        proteinas: pegarNutriente('Protein'),
        carboidratos: pegarNutriente('Carbohydrate, by difference'),
        fibras: pegarNutriente('Fiber, total dietary'),
        gorduras: pegarNutriente('Total lipid (fat)'),
        calcio: pegarNutriente('Calcium, Ca'),
        ferro: pegarNutriente('Iron, Fe'),
        potassio: pegarNutriente('Potassium, K'),
        vitaminaC: pegarNutriente('Vitamin C, total ascorbic acid'),
      });
    } catch (error) {
      setErro('Erro ao buscar informações.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

 
      {/* <View style={styles.header}>
        <Text style={styles.Title}> </Text>
      </View> */}
     

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.wikifrutastitle}>
          <MaterialCommunityIcons name="food-apple" size={50} color={ROXO_VIBRANTE} />
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.bloodValueText}>Wiki Frutas</Text>
            <Text style={styles.bloodLabelText}>BUSCA NUTRICIONAL</Text>
            <Text style={styles.statusLinha}>Digite uma fruta e veja os nutrientes.</Text>
          </View>
        </View>

        <Text style={styles.label}>Nome da fruta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: banana"
          value={fruta}
          onChangeText={(t) => {
            setFruta(t);
            if (erro) setErro('');
          }}
          returnKeyType="search"
          onSubmitEditing={buscarFruta}
        />

        <Pressable style={styles.buttonBuscar} onPress={buscarFruta}>
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>

        {loading && (
          <View style={{ marginTop: 18 }}>
            <ActivityIndicator size="large" color={ROXO_VIBRANTE} />
          </View>
        )}

        {!!erro && <Text style={styles.erro}>{erro}</Text>}

        {dados && (
          <View style={styles.card}>
            <Text style={styles.nome}>{dados.nome}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.info}>🔥 Calorias:</Text>
              <Text style={styles.infoValor}>{dados.calorias}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.info}>💪 Proteínas:</Text>
              <Text style={styles.infoValor}>{dados.proteinas}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.info}>🍞 Carboidratos:</Text>
              <Text style={styles.infoValor}>{dados.carboidratos}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.info}>🌾 Fibras:</Text>
              <Text style={styles.infoValor}>{dados.fibras}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.info}>🥑 Gorduras:</Text>
              <Text style={styles.infoValor}>{dados.gorduras}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.info}>🦴 Cálcio:</Text>
              <Text style={styles.infoValor}>{dados.calcio}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.info}>🩸 Ferro:</Text>
              <Text style={styles.infoValor}>{dados.ferro}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.info}>⚡ Potássio:</Text>
              <Text style={styles.infoValor}>{dados.potassio}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.info}>🍊 Vitamina C:</Text>
              <Text style={styles.infoValor}>{dados.vitaminaC}</Text>
            </View>
          </View>
        )}

        {/* espaço pro botão voltar não cobrir */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Botão Voltar fixo (não sobe com teclado) */}
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