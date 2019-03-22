import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './components/Home';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewCard from './components/NewCard';
import AddDeck from './components/AddDeck';

const HeaderNavigator = createStackNavigator({
  Home: {screen: Home},
  Deck: {screen: Deck},
  Quiz: {screen: Quiz},
  NewCard: {screen: NewCard},
  AddDeck: {screen: AddDeck},
});

const App = createAppContainer(HeaderNavigator);

export default App;
