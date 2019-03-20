import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { fetchData, storeData } from '../utils/api';

class NewCard extends Component {
  state = {
    answer: '',
    expected: true,
    question: '',
    radio: [
      { label: 'True', value: true },
      { label: 'False', value: false }
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
      <View>
        <View>
          <Text>Question{this.state.id}</Text>
          <TextInput
             autoFocus={true}
             onChangeText={(question) => this.setState({question})}
             value={this.state.question}
           />
        </View>
        <View>
          <Text>Answer</Text>
          <TextInput
             onChangeText={(answer) => this.setState({answer})}
             value={this.state.answer}
           />
        </View>
        <View>
          <RadioForm
            radio_props={this.state.radio}
            initial={0}
            onPress={(value) => {this.setState({expected: value})}}
            formHorizontal={true}
          />
        </View>
        <View>
          <Button title="Add" onPress={this.onPress} />
        </View>
      </View>
    )
  }
}

export default NewCard;