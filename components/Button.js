import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import colors from '../assets/colors';

class Button extends Component {
  onButtonPress = (e) => {
    const { onPress } = this.props;
    if (onPress) onPress(e);
  }

  render() {
    const { title } = this.props;

    return (
      <TouchableHighlight
        style={styles.button}>
          <Text style={styles.buttonText}>
            {title}
          </Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.black,
    borderRadius: 4,
    borderRadius: 60,
    borderWidth: 0.5,
    margin: 16,
    marginVertical: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    marginHorizontal: 8,
    marginVertical: 16,
    textAlign: 'center',
  },
});

export { Button };