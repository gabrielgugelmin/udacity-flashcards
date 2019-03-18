import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import List from './List';

class Home extends Component {
 render() {
   return (
    <View>
      <View>
        <Text>Teste</Text>
        <List navigation={this.props.navigation} />
      </View>
    </View>
   );
 }
}

export default Home;