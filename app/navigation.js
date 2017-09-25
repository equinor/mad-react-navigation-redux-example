import { StackNavigator } from 'react-navigation';
import Placeholder from './components/containers/Placeholder';


const AppNavigator = StackNavigator({
  Home: { screen: Placeholder },
});

export default AppNavigator;
