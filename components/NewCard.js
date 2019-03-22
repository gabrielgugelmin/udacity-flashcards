import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Button from './Button';
import { fetchData, storeData } from '../utils/api';
import colors from '../assets/colors';

class NewCard extends Component {
  static navigationOptions = {
    title: 'Novo Card',
  };

  state = {
    answer: '',
    expected: true,
    question: '',
    radio: [
      { label: 'Verdadeira', value: true },
      { label: 'Falsa', value: false }
    ],
  }

  onPress = () => {
    const { question, answer, expected } = this.state;

    if (question.length && answer.length) {
      fetchData(data => {
        if (data) {
          const id = this.props.navigation.getParam('id');
          const d = JSON.parse(data).map(item => {
            if (item.id === id) {
              item.flashcards.push({
                question,
                answer,
                expected,
              });
            }

            return item;
          });

          storeData(d, () => {
            this.props.navigation.goBack()
          })
        }
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Pergunta:</Text>
          <TextInput
            style={styles.input}
            autoFocus={true}
            onChangeText={(question) => this.setState({ question })}
            value={this.state.question}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Resposta:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(answer) => this.setState({ answer })}
            value={this.state.answer}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>A resposta esperada da pergunta é:</Text>
          <RadioForm
            radio_props={this.state.radio}
            buttonColor={colors.blue}
            labelColor={colors.black}
            initial={0}
            onPress={(value) => { this.setState({ expected: value }) }}
            formHorizontal={false}
          />
        </View>
        <View>
          <Button title="Adicionar" onPress={this.onPress} />
        </View>
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
  },
  formControl: {
    marginBottom: 15,
  },
});

export default NewCard;