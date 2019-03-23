import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';
import Button from './Button';
import colors from '../assets/colors';

export default class QuizResult extends Component {
  componentDidMount () {
    clearLocalNotification().then(setLocalNotification);
  }

  render() {
    return (
      <View>
        <Text style={styles.position}>Você acertou {`${this.props.percentage}%!`}</Text>
        <Button title="Tentar novamente" onPress={() => this.props.newQuiz() }/>
        <Button title="Voltar para home" buttonClass="ghost" onPress={() => this.props.navigation.navigate('Home') }/>
        <Button title="Voltar para o deck" buttonClass="ghost" onPress={() => this.props.navigation.goBack()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  position: {
    color: colors.blue2,
    fontSize: 32,
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
  }
});