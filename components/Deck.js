import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { fetchData } from '../utils/api';
import DeckCard from './DeckCard';
import Button from './Button';


class Deck extends Component {
  static navigationOptions = {
    title: 'Deck',
  };

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
      this.setState({ id, flashcards });
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
        <View style={styles.container}>
          <DeckCard
            flashcards={this.state.flashcards}
            id={this.state.id}
            navigation={this.props.navigation}
            title={this.state.title}
          />
          <Button title={'Novo Card'} onPress={this.addCard} />
          <Button title={'Começar Quiz'} onPress={this.startQuiz} disabled={!this.state.flashcards}/>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default Deck;