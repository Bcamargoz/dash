
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from './screens/HomeScreen';
import SaleHistoryScreen from './screens/SalesHistoryScreen';
import HelpScreen from './screens/HelpScreen';
import LoginScreen from './screens/LoginScreen';
import sideMenu from './screens/sideMenu';

const AppStack = createStackNavigator({
  Home: {screen: HomeScreen, navigationOptions: { header: null }},
  SalesHistory: {screen: SaleHistoryScreen, navigationOptions: { header: null }},
  Help: {screen: HelpScreen, navigationOptions: { header: null }}
});

const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { header: null }},
});


const AppDrawer = createDrawerNavigator(
  {
    AppStack: AppStack,
  }, {
    contentComponent: sideMenu,
    drawerWidth: 230,
    contentOptions: {
      activeTintColor: 'green',
    },
  },
);

const MainNavigator = createSwitchNavigator({
  App: AppDrawer,
  Auth: AuthStack,
}, { initialRouteName: 'Auth' });

const Router = createAppContainer(MainNavigator);

export default Router;