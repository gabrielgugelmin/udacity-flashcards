import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import colors from '../assets/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
          <MaterialCommunityIcons name="cards-outline" size={24} style={styles.icon} />
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.desc}>{`${this.props.flashcards} cards`}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.gray2,
    borderRadius: 5,
    elevation: 1,
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    color: colors.blue,
    fontWeight: "300",
  },
  desc: {
    fontSize: 16,
    color: colors.blue2,
    fontWeight: "300",
  },
  icon: {
    color: colors.green,
    marginRight: 15,
  }
});

export default DeckCard;