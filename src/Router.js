
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const AppStack = createStackNavigator({
  Home: {screen: HomeScreen, navigationOptions: { header: null }},
});

const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { header: null }},
});

const MainNavigator = createSwitchNavigator({
  App: AppStack,
  Auth: AuthStack,
}, { initialRouteName: 'Auth' });

const Router = createAppContainer(MainNavigator);

export default Router;