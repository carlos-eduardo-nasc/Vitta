import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';
import styles from './styles';
import React, { useEffect } from 'react';

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // ✅ Sempre vai pro Login
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logoVitta.jpeg')}
        style={styles.logo}
        resizeMode='contain'
      />
      <StatusBar style="auto" />
    </View>
  );
}