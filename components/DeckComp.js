import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { fetchData } from '../utils/api';
import DeckCard from './DeckCard';
import PropTypes from 'prop-types';


 class DeckComp extends Component {
   constructor(props) {
     super(props);

     this.updateRenderAfterNavigation = this.props.navigation.addListener('willFocus', () => {
       this.fetchFlashcards()
     });
   }

   componentWillMount() {
     this.updateRenderAfterNavigation;
   }

   state = {
     id: 0,
     title: '',
     flashcards: 0,
   }

   startQuiz = () => {
    this.props.navigation.navigate('Quiz', {
      id: this.state.id,
    });
   }

   addCard = () => {}

   fetchFlashcards = () => {
     fetchData(data => {
       const id = this.props.navigation.getParam('id');
       const flashcards = JSON.parse(data).filter(item => item.id === id)[0].flashcards.length;
       this.setState({ flashcards });
     });
   }

   componentDidMount () {
     const id = this.props.navigation.getParam('id');
     const title = this.props.navigation.getParam('title');
     this.fetchFlashcards();
     this.setState({
       id,
       title,
     });
   }

   render() {
     return (
       <View key={this.state.id}>
         <View>
          <DeckCard
            flashcards={this.state.flashcards}
            id={this.state.id}
            navigation={this.props.navigation}
            title={this.state.title}
          />
         </View>
         <View>
           <Button title={'Add Card'} onPress={this.addCard}/>
           <Button title={'Start Quiz'} onPress={this.startQuiz} />
         </View>
       </View>
     )
   }
 }

 DeckComp.propTypes = {
   navigation: PropTypes.object.isRequired,
 };

export default DeckComp;