import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import NewEntryScreen from './screens/NewEntryScreen';
import HistoryScreen from './screens/HistoryScreen';
import ReportsScreen from './screens/ReportsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { TransactionsProvider } from './context/TransactionsContext';

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f9eec9',
  },
};

export default function App() {
  return (
    <TransactionsProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <NavigationContainer theme={navTheme}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  const icons = {
                    Home: focused ? 'home' : 'home-outline',
                    Registrar: focused ? 'add-circle' : 'add-circle-outline',
                    Historico: focused ? 'reader' : 'reader-outline',
                    Relatorios: focused ? 'bar-chart' : 'bar-chart-outline',
                    Config: focused ? 'settings' : 'settings-outline',
                  };
                  return <Ionicons name={icons[route.name]} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2c241c',
                tabBarInactiveTintColor: '#8a7968',
                tabBarStyle: {
                  paddingBottom: 6,
                  paddingTop: 6,
                  height: 64,
                  backgroundColor: '#f6c645',
                  borderTopWidth: 0,
                },
                headerShown: false,
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Registrar" component={NewEntryScreen} />
              <Tab.Screen name="Historico" component={HistoryScreen} options={{ title: 'Histórico' }} />
              <Tab.Screen name="Relatorios" component={ReportsScreen} options={{ title: 'Relatórios' }} />
              <Tab.Screen name="Config" component={ProfileScreen} options={{ title: 'Config' }} />
            </Tab.Navigator>
            <StatusBar style="dark" />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </TransactionsProvider>
  );
}
