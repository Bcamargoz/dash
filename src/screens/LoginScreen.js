import React, { Component } from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getLogin, login } from '../actions/authActions';
import colors from '../vars/colors';

const LOGO = require('../assets/logo.png');

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      app: 'dashboard',
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    const { getLogin } = this.props;

    getLogin();
  }

  onSubmit = () => {
    const { login } = this.props;

    login(this.state);
  }

  render() {
    const { email, password } = this.state;
    const disabled = (!email || !password);

    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image source={LOGO}
              style={{ width: 300, height: 80 }} />
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>Correo electrónico</Text>
            <Input
              containerStyle={styles.input}
              autoFocus
              autoCapitalize='none'
              keyboardType='email-address'
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              returnKeyType='next'
              onChangeText={email => this.setState({ email })}
              blurOnSubmit={false}
              errorStyle={{ textAlign: 'center', fontSize: 12 }}
            />
            <Text style={styles.text}>Contraseña</Text>
            <Input
              containerStyle={styles.input}
              ref={(input) => { this.secondTextInput = input; }}
              secureTextEntry
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              blurOnSubmit
            />
            <TouchableOpacity
              onPress={() => {
                const url = 'http://pos.vendty.com/index.php/auth/forgot_password';

                Linking.canOpenURL(url).then(supported => {
                  if (supported) {
                    Linking.openURL(url);
                  }
                })
              }}
              style={styles.forgot_password}
            >
              <Text style={styles.link}>¿Has olvidado tu clave?</Text>
            </TouchableOpacity>
            <Button
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.buttonContainer}
              disabled={disabled}
              onPress={this.onSubmit}
              title='INICIAR SESIÓN'
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
};

export default connect(null, { getLogin, login })(LoginScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 50,
  },
  body: {
    marginTop: 30,
    width: 500,
    maxWidth: '90%',
  },
  text: {
    paddingHorizontal: 15,
  },
  input: {
    marginVertical: 5,
  },
  forgot_password: {
    marginHorizontal: 10,
  },
  link: {
    color: colors.GREEN_DARK,
  },
  buttonContainer: {
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: colors.GREEN_DARK,
    borderRadius: 30,
  }
});