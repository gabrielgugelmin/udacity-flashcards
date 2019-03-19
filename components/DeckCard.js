import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import colors from '../assets/colors';


class DeckCard extends Component {
  onPress = () => {
    this.props.navigation.navigate('Deck', {
      flashcards: this.props.flashcards,
      id: this.props.id,
      title: this.props.title,
    });
  }

  render() {
    return (
      <TouchableHighlight
        style={styles.card}
        onPress={this.onPress}
      >
        <View>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text>{`${this.props.flashcards} cards`}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    elevation: 2,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontWeight: "bold",
  }
});

export default DeckCard;