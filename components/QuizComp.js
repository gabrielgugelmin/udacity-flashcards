import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { fetchData } from '../utils/api';

class QuizComp extends Component {
  state = {
    flashcards: [],
    position: 0,
    showAnswer: false,
    answers: [],
    final: false,
  }

  fetchFlashcards = () => {
    fetchData(data => {
      const flashcards = JSON.parse(data).filter(item => item.id === this.props.id)[0].flashcards;
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
      return {
        ...prevState,
        position: prevState.position + 1,
        showAnswer: false,
        answers: prevState.answers.push(answer),
        final: theEnd,
      }
    })
  }

  render() {
    const { flashcards, position } = this.state;
    const flashcard = flashcards[position];
    const question = flashcard ? flashcard.question : 'Loading';
    const answer = flashcard ? flashcard.answer : 'Loading';

    return (
      <View>
        {
          this.state.final ? (
            <Text>Acabaram as pergutnas</Text>
          ) : (
            this.state.showAnswer ? (
              <Text>{answer}</Text>
            ) : (
              <Text>{question}</Text>
            )
              <Button title={(this.state.showAnswer) ? 'Show question' : 'Show answer'} onPress={this.showAnswer}/>
              <Button title="Correct" onPress={() => this.submitAnswer(true)} />
              <Button title="Incorrect" onPress={() => this.submitAnswer(false)} />
          )
        }
      </View>
    )
  }
}

export default QuizComp;