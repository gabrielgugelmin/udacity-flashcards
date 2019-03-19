import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from './Button';

class Deck extends Component {

  state = {
    id: 0,
    title: '',
    flashcards: 0,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
    };
  };

  componentDidMount () {
    const flashcards = this.props.navigation.getParam('flashcards');
    const id = this.props.navigation.getParam('id');
    const title = this.props.navigation.getParam('title');

    this.setState({
      id,
      title,
      flashcards: flashcards.length,
    });
  }

  startQuiz = () => {
    this.props.navigation.navigate('Quiz', {
      id: this.state.id,
    });
  }

  render() {
    return (
      <View>
        <Text>{this.state.title}</Text>
        <Text>{`${this.state.flashcards} cards`}</Text>
        <Button title={'Add Card'} />
        <Button title={'Start Quiz'} onPress={this.startQuiz} />
      </View>
    );
  }
}

export default Deck;