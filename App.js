import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import HomeView from './scr/views/HomeView';
import PokemonDetailsView from './scr/views/PokemonDetailsView';
import MyPokemonView from './scr/views/MyPokemonView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FontAweSomeIcon  from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialIcons';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Store from './scr/store/configureStore'
const HomeStack = createStackNavigator();
const MyPokemonStack = createStackNavigator();
const Tab = createBottomTabNavigator();
let persistor = persistStore(Store)

function HomeStackScreen() {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeView}/>
      <HomeStack.Screen name="Details" component={PokemonDetailsView} />
    </HomeStack.Navigator>
  )
}

function MyPokemonStackScreen() {
  return(
    <MyPokemonStack.Navigator >
      <MyPokemonStack.Screen name="MyPokemon" component={MyPokemonView} options={{header: () => null}}/>
    </MyPokemonStack.Navigator>
  )
}

const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading = {null} persistor = {persistor}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeStackScreen} options={{
              header: () => null,
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}/>
            <Tab.Screen name='MyPokemon' component={MyPokemonStackScreen}
              options={{
                tabBarLabel: 'MyPokemon',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="face" color={color} size={26} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;