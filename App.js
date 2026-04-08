import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Splash from './src/pages/Splash';
import Cadastro from './src/pages/Cadastro';
import Home from './src/pages/Home';
import Agua from './src/pages/Agua';
import Sangue from './src/pages/Sangue';
import Vacinas from './src/pages/Vacinas';
import IMC from './src/pages/IMC';
import Login from './src/pages/Login';
import Fruta from './src/pages/Fruta';
import Glicemia from './src/pages/Glicemia';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Agua" component={Agua} options={{ headerShown: false }} />
        <Stack.Screen name="Sangue" component={Sangue} options={{ headerShown: false }} />
        <Stack.Screen name="Vacinas" component={Vacinas} options={{ headerShown: false }} />
        <Stack.Screen name="IMC" component={IMC} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Fruta" component={Fruta} options={{ headerShown: false }} />
        <Stack.Screen name="Glicemia" component={Glicemia} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}