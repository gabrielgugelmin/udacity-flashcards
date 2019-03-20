import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { fetchData } from '../utils/api';

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  };

  state = {
    flashcards: [],
    position: 0,
    showAnswer: false,
    answers: [],
    final: false,
    correct: 0,
  }

  fetchFlashcards = () => {
    const id = this.props.navigation.getParam('id');
    // console.log('fetchFlashcards', id);
    fetchData(data => {
      // let flashcards = JSON.parse(data).flashcards.filter(item => item.id === id).flashcards;
      const flashcards = JSON.parse(data)[id].flashcards;
      // console.log(flashcards);
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
    console.log(answer);
    this.setState(prevState => {
      const theEnd = (this.state.flashcards.length === prevState.position + 1) || false;
      // console.log(prevState.answers.push(answer));
      console.log(prevState.flashcards[prevState.position].expected);
      const expected = prevState.flashcards[prevState.position].expected;
      const isAnswerCorrect = (expected === answer) ? 1 : 0;

      return {
        ...prevState,
        position: prevState.position + 1,
        correct: prevState.correct + isAnswerCorrect,
        showAnswer: false,
        answers: [...prevState.answers, answer],
        final: theEnd,
      }
    })
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
              <Text>Acabaram as pergutnas{this.state.answers.length}</Text>
              <Text>Você acertou {`${percentage}%`}</Text>
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