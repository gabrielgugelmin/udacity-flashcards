import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './components/Home';

const HeaderNavigator = createStackNavigator({
  Home: {screen: Home},
});

const App = createAppContainer(HeaderNavigator);

export default App;
