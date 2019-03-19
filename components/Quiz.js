import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  render() {
    const id = this.props.navigation.getParam('id');

    return (
      <View>
        <Text>{id}</Text>
      </View>
    );
  }
}

export default Quiz;