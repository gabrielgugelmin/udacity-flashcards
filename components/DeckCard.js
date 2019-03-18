import React, { Component } from 'react';
import { Animated, Text, View, TouchableHighlight } from 'react-native';


class DeckCard extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight>
          <View>
            <Text>{this.props.title}</Text>
            <Text>{`${this.props.flashcards} Cartões`}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default DeckCard;