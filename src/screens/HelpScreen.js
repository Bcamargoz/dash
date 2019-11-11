import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Modal,
  Linking,
  TouchableOpacity
} from 'react-native';

import { WebView } from 'react-native-webview';
import colors from '../vars/colors';


import moment from 'moment';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CardViewComponent from '../components/CardViewComponent';

class HelpScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      app: 'dashboard',
      modalVisible: false,
      titulo_modal: ""
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    
  }

  dialCall = (number) => {
    let phoneNumber = '';
 
    if (Platform.OS === 'android') {
      phoneNumber = "tel:${"+number+"}";
    }
    else {
      phoneNumber = "telprompt:${"+number+"}";
    }
 
    Linking.openURL(phoneNumber);
  };

  
  render() {

    const { navigation } = this.props;
    return (
      <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.statusBar}>
            <View style={{ width: '20%', justifyContent: 'flex-start'}}>
              <TouchableOpacity
                style={styles.menu}
                onPress={navigation.openDrawer}
              >
                <Icon name='bars' size={35} color='white' />
              </TouchableOpacity>
            </View>
            <View style={{ width: '40%'}}>
              <Image
                source={require("../assets/logo_white.png")}
                style={styles.image}
              />
            </View>
            <View style={{ width: '20%', justifyContent: 'flex-end'}}>
            </View>
          </View>
          
          <View style={styles.body}>

            <View style={{  padding: 20, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>Canales de soporte</Text>
            </View>

            <CardViewComponent titulo={"Teléfonos de Soporte"} component={() => (
              <View style={{ flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>

                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                  <Icon name='phone' size={20} color='grey' />
                  <TouchableOpacity onPress={() => this.dialCall("+573194751398") }>
                    <Text style={{ fontFamily: "Nunito-Regular", padding: 10 }}>+(57) 3194751398</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                  <Icon name='phone' size={20} color='grey' />
                  <TouchableOpacity onPress={() => this.dialCall("+5716367799") }>
                    <Text style={{ fontFamily: "Nunito-Regular", padding: 10 }}>+(57)1 6367799</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                  <Icon name='phone' size={20} color='grey' />
                  <TouchableOpacity onPress={() => this.dialCall("+5719262045") }>
                    <Text style={{ fontFamily: "Nunito-Regular", padding: 10 }}>+(57)1 9262045</Text>
                  </TouchableOpacity>
                </View>

              </View>
            )} icon={false}>
            </CardViewComponent>

            <CardViewComponent titulo={"Generar un ticket de Soporte"} component={() => (
              <View style={{padding: 20, flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => {
                    const url = 'https://vendtycom.freshdesk.com/support/tickets/new';

                    /*Linking.canOpenURL(url).then(supported => {
                      if (supported) {
                        Linking.openURL(url);
                      }
                    });*/
                    this.setState({
                      url,
                      titulo_modal: "Generar un ticket de Soporte"
                    }, () => this.setModalVisible(true))

                  }}>
                  <Icon name='envelope' size={50} color='grey' />
                </TouchableOpacity>
              </View>
            )} icon={false}>
            </CardViewComponent>

            <CardViewComponent titulo={"Ayuda en Linea"} component={() => (
              <View style={{ padding: 20, flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => {
                    const url = 'https://ayuda.vendty.com/es/';

                    /*Linking.canOpenURL(url).then(supported => {
                      if (supported) {
                        Linking.openURL(url);
                      }
                    });*/
                    this.setState({
                      url,
                      titulo_modal: "Ayuda en Linea"
                    }, () => this.setModalVisible(true))

                  }}>
                  <Icon name='question-circle' size={55} color='grey' />
                </TouchableOpacity>
              </View>
            )} icon={false}>
            </CardViewComponent>
            
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {}}>
              <View style={{marginTop: 20}}>
                <View>
                  <View style={{ paddingBottom: 20,justifyContent: "center", alignItems: "center"}}>
                    <View style={{position: 'absolute', left: 10, top: 0 }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Icon name='arrow-left' size={20} color='#000' />
                      </TouchableOpacity>
                    </View>
                    <Text style={{fontFamily: "Nunito-Bold"}}>{ this.state.titulo_modal}</Text>
                  </View>
                  <View style={{ marginBottom: 50, height: '100%', width: '100%', backgroundColor: 'lightgrey' }}>
                    <WebView
                      source={{uri: this.state.url}}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                    />
                  </View>
                </View>
              </View>
            </Modal>

          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
};

export default HelpScreen;

const styles = StyleSheet.create({
  scrollView: {
   // backgroundColor: colors.GREY_DARK,
    minHeight: '100%',
    backgroundColor: "#f1f3f6"
  },
  select: {
    paddingLeft: 10,
    paddingRight: 10
  },
  body: {
    paddingBottom: 20 ,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  statusBar: {
    backgroundColor: colors.DARK,
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 130,
    height: 80,
    resizeMode: 'contain' 
  },
  grafica1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10
  },
  itemG1: {
    width: '90%', // is 50% of container width
    height: 70,
    borderRadius: 4,
    borderWidth: 1.2,
    borderColor: '#d6d7da',
    flexDirection: 'row',
  },
  itemG1img: {
    width: '30%', // is 50% of container width
    //backgroundColor: colors.GREEN_DARK,
    padding: 5,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemG1text: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageItem : {
    height: 35,
    width: 35
  },
  chart : {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 20,
    height: 200
  },
  textoG1 : {
    fontSize: 18,
  },
  containerButton: {
    //width: '95%', // is 50% of container width
    flexDirection: 'row',
    paddingLeft: '2.5%',
    paddingRight: '2.5%'
  },
  buttonContainer: {
      flex: 1,
  },
  menu: {
    width: 50,
  },
});
