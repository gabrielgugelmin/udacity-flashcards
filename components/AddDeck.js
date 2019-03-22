import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { fetchData, storeData } from '../utils/api';
import Button from './Button';
import colors from '../assets/colors';

class AddDeck extends Component {
  static navigationOptions = {
    title: 'Novo Deck',
  };

  state = {
    title: '',
  }

  onPress = () => {
    if (this.state.title.length) {
      fetchData(data => {
        let deck = {};

        if (data) {
          prevData = JSON.parse(data);
          id = (prevData.length + 1).toString();

          deck = {
            key: id,
            id,
            title: this.state.title,
            flashcards: [],
          }
        }

        storeData([...prevData, deck], data => {
          this.props.navigation.navigate('Deck', {
            id: deck.id,
            title: deck.title,
          });
        });
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Título:</Text>
        <TextInput
           autoFocus={true}
           onChangeText={(title) => this.setState({title})}
           value={this.state.title}
           style={styles.input}
         />
       <Button title="Adicionar" onPress={this.onPress} ></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    borderColor: colors.blue,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  label: {
    color: colors.black,
    marginBottom: 10,
  }
});

export default AddDeck;