import React, { Component } from 'react';
import { AsyncStorage, Image, Linking, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { connect } from 'react-redux';
import Colors from '../../vars/colors';

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
    };
  }

  renderItem = (name, icon, method) => {
    return (
      <TouchableHighlight onPress={method}>
        <View style={styles.containerItem}>
          <View style={styles.containerIcon}>
            <Icon name={icon} color={"#fff"} size={15} />
          </View>
          <Text style={styles.textItem}>{name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { logout, renderItem } = this;
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
          {renderItem('Inf. Ventas Diarias', 'file', () => navigation.navigate('Tickets'))}
          {renderItem('Más Funcionalidades', 'plus', () => {
            const url = 'https://pos.vendty.com';

            Linking.canOpenURL(url).then(supported => {
              if (supported) {
                Linking.openURL(url);
              }
            })
          })}
          {renderItem('Cerrar Sesión', 'power-off', logout)}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ network, token }) => {
  return { isConnected: network.isConnected, token }
}

export default connect(mapStateToProps)(SideMenu);

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
    backgroundColor: Colors.GREY1,
  },
  containerItem: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  containerIcon: {
    width: 25,
    marginRight: 20,
  },
  textItem: {
    textAlign: 'center',
    color: '#fff',
  },
}