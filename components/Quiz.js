import React, { Component } from 'react';
import { View, Text } from 'react-native';
import QuizComp from './QuizComp';

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  render() {
    const id = this.props.navigation.getParam('id');

    return (
      <View>
        <QuizComp id={id} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Quiz;