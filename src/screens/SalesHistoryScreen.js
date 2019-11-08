import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Picker,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';

import colors from '../vars/colors';


import { connect } from 'react-redux';
import { 
    getSalesHistory
} from '../actions/chartActions';
import { getLoginData, logout } from '../actions/authActions';

import moment from 'moment';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

class SalesHistoryScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      app: 'dashboard',
      warehouseSelected: 0,
      warehouseLoaded: 0,
      auth: {},
      days: 7,
      enableNotification: true,
      isDateTimePickerVisible: false,
      notificationTime: moment().add(1, 'minute')
    }
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const { getLoginData, getWarehouses } = this.props;
    getWarehouses();
    const data = await getLoginData();
    this.setState({ auth: data, warehouseSelected: data.warehouse.id }, () => {
        this.loadData(data.warehouse.id, { email: data.user.email } )
    });
  }

  onLogout = () => {
    const { logout } = this.props;
    logout();
  }

  loadData = (warehouseId, email) => {
    const {
      getWarehouse,
      getSalesHistory
    } = this.props;
    const { days } =  this.state;
    getWarehouse(warehouseId);
    getSalesHistory(email)
  }
  
  render() {
    //this.loadData();
    const {
      warehouses,
      salesHistorys
    } = this.props;   
    
    const selectWarehouse = (warehouses) => {
        if(warehouses.length > 1) {
          return (
          <View style={styles.select}>
            <Text style={{ fontSize: 14, color: 'grey', paddingTop: 10, fontFamily: "Nunito-Regular" }}>Selecciona un almacen:</Text>
            <Picker
              selectedValue={this.state.warehouseSelected}
              style={{ height: 50, fontFamily: "Nunito-Regular" }}
              mode={'dialog'}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({warehouseSelected: itemValue},() => {this.loadData(this.state.warehouseSelected)})
              }>
              {
                warehouses.map(element => <Picker.Item label={element.name} value={element.id} key={element.id} /> )
              }
            </Picker>
          </View>
          )
        } else {
          return <View>
              <Text style={{ fontFamily: "Nunito-Regular" }}>Información de tu almacen</Text>
              <Text style={{ fontFamily: "Nunito-Regular" }}>{ !warehouses[0] ? '' : warehouses[0].name }</Text>
            </View>
        }
        
    }

    //console.log(infoWarehouse);

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

            <View style={styles.select}>
              {selectWarehouse(warehouses)}
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Ventas diarias:</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 24 }}>$ 0 </Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Total de gastos:</Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 24 }}>$ 0 </Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Total de utilidad: </Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 24 }}>$ 0 </Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Devoluciones: </Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 24 }}>$ 0 </Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Formas de pago: </Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 24 }}>$ 0 </Text>
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Productos mas vendidos: </Text>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 24 }}>$ 0 </Text>
                    </View>
                </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
};

function mapStateToProps(state) {
  return {
    warehouses: state.chart.warehouses,
    salesHistory: state.chart.salesHistory
  }
}

export default connect(mapStateToProps, { 
    getSalesHistory
})(SalesHistoryScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10                              
    },
    child: {
        width: '95%', // is 50% of container width
        borderRadius: 4,
        borderWidth: 1.2,
        borderColor: '#d6d7da',
        backgroundColor: '#fff',
        padding: 10
    },
    statusBar: {
        backgroundColor: colors.DARK,
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    body: {
        paddingBottom: 20,
        backgroundColor: "#f1f3f6"
    },
    select: {
        paddingLeft: 10,
        paddingRight: 10
    },
});
