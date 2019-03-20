import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { fetchData } from '../utils/api';

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
      const flashcards = JSON.parse(data)[id].flashcards;
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
      <View>
        {
          this.state.final ? (
            <View>
              <Text>You got {`${percentage}% correct!`}</Text>
              <Button title="Restart Quiz" onPress={() => this.newQuiz() }/>
              <Button title="Back to home" onPress={() => this.props.navigation.navigate('Home') }/>
              <Button title="Back to the deck" onPress={() => this.props.navigation.goBack()}/>
            </View>
          ) : (
            <View>
              <Text>{`${position + 1}/${flashcards.length}`}</Text>
              { this.state.showAnswer ? (
                <Text>{answer}</Text>
              ) : (
                <Text>{question}</Text>
              )}
                <Button title={(this.state.showAnswer) ? 'Show question' : 'Show answer'} onPress={this.showAnswer}/>
                <Button title="Correct" onPress={() => this.submitAnswer(true)} />
                <Button title="Incorrect" onPress={() => this.submitAnswer(false)} />
            </View>
          )
        }
      </View>
    )
  }
}

export default Quiz;