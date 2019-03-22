import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fetchData } from '../utils/api';
import Button from './Button';
import colors from '../assets/colors';

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  state = {
    answers: [],
    correct: 0,
    final: false,
    flashcards: [],
    position: 0,
    showAnswer: false,
  }

  fetchFlashcards = () => {
    const id = this.props.navigation.getParam('id');
    fetchData(data => {
      const flashcards = JSON.parse(data).filter(item => item.id === id)[0].flashcards;
      this.setState({ flashcards });
    });
  }

  componentDidMount() {
    this.fetchFlashcards();
  }

  showAnswer = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showAnswer: !prevState.showAnswer,
      }
    })
  }

  submitAnswer = (answer) => {
    this.setState(prevState => {
      const theEnd = (this.state.flashcards.length === prevState.position + 1) || false;
      const expected = prevState.flashcards[prevState.position].expected;
      const isAnswerCorrect = (expected === answer) ? 1 : 0;

      return {
        ...prevState,
        answers: [...prevState.answers, answer],
        correct: prevState.correct + isAnswerCorrect,
        final: theEnd,
        position: prevState.position + 1,
        showAnswer: false,
      }
    })
  }

  newQuiz = () => {
    this.setState({
      answers: [],
      correct: 0,
      final: false,
      position: 0,
      showAnswer: false,
    });
  }

  render() {
    const { flashcards, position, correct } = this.state;
    const flashcard = flashcards[position];
    const question = flashcard ? flashcard.question : 'Loading';
    const answer = flashcard ? flashcard.answer : 'Loading';
    const percentage = Math.floor((correct / flashcards.length) * 100);

    return (
      <View style={styles.container}>
        {
          this.state.final ? (
            <View>
              <Text style={styles.position}>Você acertou {`${percentage}%!`}</Text>
              <Button title="Tentar novamente" onPress={() => this.newQuiz() }/>
              <Button title="Voltar para home" buttonClass="ghost" onPress={() => this.props.navigation.navigate('Home') }/>
              <Button title="Voltar para o deck" buttonClass="ghost" onPress={() => this.props.navigation.goBack()}/>
            </View>
          ) : (
            <View>
              <Text style={styles.position}>{`${position + 1}/${flashcards.length}`}</Text>
              { this.state.showAnswer ? (
                <Text style={styles.text}>{answer}</Text>
              ) : (
                <Text style={styles.text}>{question}</Text>
              )}
                <Button title={(this.state.showAnswer) ? 'Mostrar pergunta' : 'Mostrar resposta'} onPress={this.showAnswer} buttonClass='link' />
                <Button title="Verdadeiro" onPress={() => this.submitAnswer(true)} buttonClass='green'/>
                <Button title="Falso" onPress={() => this.submitAnswer(false)} buttonClass='red' />
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    color: colors.black,
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  position: {
    color: colors.blue2,
    fontSize: 32,
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
  }
});

export default Quiz;