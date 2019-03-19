import React, { Component } from 'react';
import { View } from 'react-native';
import DeckComp from './DeckComp'
// import DeckFeat from './DeckFeat';

class DeckView extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
    };
  };

  render() {
    return (
      <View>
        <DeckComp navigation={this.props.navigation}>Deck view</DeckComp>
      </View>
    );
  }
}

export default DeckView;