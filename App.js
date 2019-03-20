import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './components/Home';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewCard from './components/NewCard';

const HeaderNavigator = createStackNavigator({
  Home: {screen: Home},
  Deck: {screen: Deck},
  Quiz: {screen: Quiz},
  NewCard: {screen: NewCard},
});

const App = createAppContainer(HeaderNavigator);

export default App;
