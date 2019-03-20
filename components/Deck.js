import React, { Component } from 'react';
import { View, Button, Text, Animated } from 'react-native';
import { fetchData } from '../utils/api';
import DeckCard from './DeckCard';


class Deck extends Component {
  constructor(props) {
    super(props);

    this.updateRenderAfterNavigation = this.props.navigation.addListener('willFocus', () => {
      this.fetchFlashcards()
    });
  }

  componentWillMount() {
    this.updateRenderAfterNavigation;
  }

  state = {
    id: 0,
    title: '',
    flashcards: 0,
    transition: new Animated.Value(1.2),
  }

  startQuiz = () => {
    this.props.navigation.navigate('Quiz', {
      id: this.state.id,
    });
  }

  addCard = () => {
    this.props.navigation.navigate('NewCard', {
      id: this.state.id,
      title: this.state.title,
    });
  }

  fetchFlashcards = () => {
    fetchData(data => {
      const id = this.props.navigation.getParam('id');
      const flashcards = JSON.parse(data).filter(item => item.id === id)[0].flashcards.length;
      this.setState({ flashcards });
    });
  }

  componentDidMount() {
    const id = this.props.navigation.getParam('id');
    const title = this.props.navigation.getParam('title');
    const { transition } = this.state;

    this.fetchFlashcards();
    this.setState({
      id,
      title,
    });

    Animated.sequence([
      Animated.timing(transition, { duration: 300, toValue: 1 }),
      Animated.spring(transition, { toValue: 1, friction: 8 })
    ]).start()
  }

  render() {
    const { transition } = this.state;

    return (
      <Animated.View key={this.state.id} style={[{ transform: [{ scale: transition }] }]}>
        <View>
          <DeckCard
            flashcards={this.state.flashcards}
            id={this.state.id}
            navigation={this.props.navigation}
            title={this.state.title}
          />
        </View>
        <View>
          <Button title={'Add Card'} onPress={this.addCard} />
          <Button title={'Start Quiz'} onPress={this.startQuiz} />
        </View>
      </Animated.View>
    )
  }
}

export default Deck;