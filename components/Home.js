import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import List from './List';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  addDeck = () => {
    this.props.navigation.navigate('AddDeck');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          <List navigation={this.props.navigation} style={styles.list}/>
        </View>
        <View style={styles.button}>
          <Button title="Novo deck" onPress={this.addDeck} ></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  list: {
    flex: 1
  },
  button: {
    // flex: 1,
  }
});

export default Home;