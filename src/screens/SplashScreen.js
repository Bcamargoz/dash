import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image
} from 'react-native';

class SplashScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      app: 'dashboard',
      modalVisible: false,
      titulo_modal: ""
    }
  }

  componentDidMount() {
  }
  
  render() {
    const logo = require('../assets/logo.png');
    return (
      <>
        <SafeAreaView>
            <View style={styles.body}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
            </View>
        </SafeAreaView>
      </>
    );
  }
};

export default SplashScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  logo : {
    width: '80%',
    resizeMode: 'contain'
  }
});
