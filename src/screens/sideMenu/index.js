import React, { Component } from 'react';
import { Image, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { connect } from 'react-redux';
import Colors from '../../vars/colors';
import { logout } from '../../actions/authActions';

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
    };
  }

  renderItem = (name, icon, method, active = true) => {
    return (
      <TouchableHighlight onPress={method}>
        <View style={styles.containerItem}>
          <View style={styles.containerIcon}>
            <Icon name={icon} color={ active ? "#fff" : 'grey' } size={25} />
          </View>
          <Text style={{
              textAlign: 'center',
              color: active ? "#fff" : 'grey',
              fontFamily: "Nunito-Regular"
            }}>
            {name}
          </Text>
          {
            !active ?
            <View style={{ paddingRight: 5, paddingLeft: 5, backgroundColor: '#23a455', position: 'absolute', top: '10%', right: '20%', borderColor: '#23a455', borderWidth: 1 , borderRadius: 10}}> 
              <Text style={{ color: 'white', fontSize: 9, fontFamily: "Nunito-Bold" }} >Proximamente</Text> 
            </View>
            : <></>
          }
        </View>
      </TouchableHighlight>
    );
  }

  logout = () => {
    const { navigation, logout, intervalRequest } = this.props;
    logout();
    clearInterval(intervalRequest);
    navigation.navigate('Auth')
  }

  render() {
    const { renderItem, logout } = this;
    const { navigation } = this.props;
    const { spinner } = this.state;

    return (
      <View style={styles.container}>
        <Spinner visible={spinner} />
        <View style={styles.containerLogo}>
          <Image
            style={styles.logo}
            source={require('../../assets/logoVendty.png')}
            resizeMode="stretch"
          />
        </View>
        <ScrollView style={styles.containerItems}>
          {renderItem('Dashboard', 'chart-bar', () => navigation.navigate('Home'))}
          {renderItem('Hist. Ventas', 'clock', () => navigation.navigate('SalesHistory'))}
          {renderItem('Soporte', 'user-cog', () => navigation.navigate('Help'))}
          {/*renderItem('Más Funcionalidades', 'plus', () => {
            const url = 'https://pos.vendty.com';

            Linking.canOpenURL(url).then(supported => {
              if (supported) {
                Linking.openURL(url);
              }
            })
          })*/}
          {renderItem('Usuarios', 'users', () => {}, false)}
          {renderItem('Licencias', 'id-badge', () => {}, false)}
          {renderItem('Cerrar Sesión', 'power-off', logout)}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    isConnected: state.network.isConnected, 
    token: state.token, 
    intervalRequest: state.chart.intervalRequest
  }
}

export default connect(mapStateToProps, { logout })(SideMenu);

const styles = {
  container: {
    backgroundColor: '#000',
    height: '100%',
  },
  containerLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 60,
    marginVertical: 10,
  },
  containerItems: {
    backgroundColor: Colors.GREY_DARK,
  },
  containerItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  containerIcon: {
    width: 35,
    marginRight: 20,
    marginLeft: 20,
  },
  textItem: {
    textAlign: 'center',
    color: '#fff',
  },
}