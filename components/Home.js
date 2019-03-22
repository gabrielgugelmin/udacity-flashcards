import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from './Button';
import List from './List';
import { setNotification } from '../utils/notification';
import colors from '../assets/colors';

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
        <View>
          <Text style={styles.title}>Escolha seu deck para começar:</Text>
        </View>
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
  title: {
    color: colors.blue2,
    fontSize: 32,
    marginBottom: 30,
    marginTop: 30,
    textAlign: 'center',
  }
});

export default Home;