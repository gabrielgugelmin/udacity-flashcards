import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, FlatList, Text } from 'react-native';
import DeckCard from './DeckCard';
import { fetchData, storeData } from '../utils/api';
import PropTypes from 'prop-types';

const list = [
  {
    id: 'comida',
    title: 'Comida',
    flashcards: [
      {
        question: 'Pizza é a comida mais democrática do mundo?',
        answer: 'Sim!',
      },
      {
        question: 'Comer salada faz bem para saúde?',
        answer: 'Sim!',
      },
      {
        question: 'Beterraba é horrível?',
        answer: 'Sim!',
      }
    ]
  },
  {
    id: 'animais',
    title: 'Animais',
    flashcards: [
      {
        question: 'Cachorros tem 4 patas?',
        answer: 'Sim!',
      },
      {
        question: 'Gatos latem?',
        answer: 'Não, eles miam.',
      }
    ]
  }
]

class List extends Component {
  state = {
    loading: false,
    list: {},
  }

  renderDeck = (item) => {
    return (
      <DeckCard id={item.id} title={item.title} flashcards={item.flashcards.length} navigation={this.props.navigation} />
    )
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      fetchData(data => {
        if (data) {
          this.setState(
            {
              loading: false,
              list: JSON.parse(data),
            }
          );
        } else {
          storeData(list, data => {
            this.setState(
              {
                loading: false,
                list: JSON.parse(data)
              }
            );
          });
        }
      });
    });
  }

  componentDidMount () {
    this.fetchData();
  }

  render() {
    if (this.state.loading) {
      return (
        <Text>Loading...</Text>
      )
    } else {
      return (
        <View style={{ marginVertical: 5 }}>
          <FlatList
            data={this.state.list}
            renderItem={({item}) => this.renderDeck(item)}
            />
        </View>
      )
    }
  }
}

List.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default List;