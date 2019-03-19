import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './components/Home';
import Deck from './components/Deck';

const HeaderNavigator = createStackNavigator({
  Home: {screen: Home},
  Deck: {screen: Deck},
});

const App = createAppContainer(HeaderNavigator);

export default App;
