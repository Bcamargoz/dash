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
  getSalesXhour,
  getLastSevenDays,
  getWarehouse,
  getWarehouses,
  getMostSoldCategories,
  getDishesSoldPerday,
  getPaymentsMethodsOfday,
  getInfoWarehouses
} from '../actions/chartActions';
import { getLoginData, logout } from '../actions/authActions';

import moment from 'moment';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

class HelpScreen extends React.Component {

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
    console.log({ auth: data, warehouseSelected: data.warehouse.id });
    this.setState({ auth: data, warehouseSelected: data.warehouse.id }, () => {this.loadData(data.warehouse.id)});
  }

  onLogout = () => {
    const { logout } = this.props;
    logout();
  }

  loadData = (warehouseId) => {
    const {
      getSalesXhour,
      getLastSevenDays,
      getWarehouse,
      getMostSoldCategories,
      getDishesSoldPerday,
      getPaymentsMethodsOfday,
      getInfoWarehouses
    } = this.props;
    const { days } =  this.state;
    getSalesXhour(warehouseId);
    getLastSevenDays(warehouseId);
    getWarehouse(warehouseId);
    getMostSoldCategories(warehouseId);
    getDishesSoldPerday(warehouseId);
    getPaymentsMethodsOfday(warehouseId);
    getInfoWarehouses(warehouseId, days);
  }

  setDays = (days) => {
    const {
      getInfoWarehouses
    } = this.props;
    const { warehouseSelected } = this.state;
    this.setState({
      days: days
    });
    getInfoWarehouses(warehouseSelected, days);
  }
  
  render() {
    //this.loadData();
    const {
      salesXhour,
      salesLastSevenDays,
      infoWarehouse,
      warehouses,
      mostSoldCategories,
      dishesXday,
      paymentsMethodsOfday,
      daySales
    } = this.props;    

    const selectWarehouse = (warehouses) => {
      if(warehouses.length > 1) {
        return (
        <View style={styles.select}>
          <Text style={{ fontSize: 14, color: 'grey', paddingTop: 10, fontFamily: "Montserrat-Regular" }}>Selecciona un almacen:</Text>
          <Picker
            selectedValue={this.state.warehouseSelected}
            style={{ height: 50 }}
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
            <Text>Información de tu almacen</Text>
            <Text>{ !warehouses[0] ? '' : warehouses[0].name }</Text>
          </View>
      }
      
    }
    //console.log(infoWarehouse);

    const {days, notificationTime} = this.state;
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

            <Text>Soporte</Text>


          </View>
        </ScrollView>
      </SafeAreaView>
      </>
    );
  }
};

function mapStateToProps(state) {
  return {
    salesXhour: state.chart.salesXhour,
    salesLastSevenDays: state.chart.lastSevenDays,
    infoWarehouse: state.chart.warehouse,
    warehouses: state.chart.warehouses,
    mostSoldCategories: state.chart.mostSoldCategories,
    dishesXday: state.chart.dishesSoldPerday,
    paymentsMethodsOfday:  state.chart.paymentsMethodsOfday,
    daySales: state.chart.infoWarehouse
  }
}

export default connect(mapStateToProps, { 
  logout,
  getSalesXhour, 
  getLoginData, 
  getLastSevenDays, 
  getWarehouse,
  getWarehouses,
  getMostSoldCategories,
  getDishesSoldPerday,
  getPaymentsMethodsOfday,
  getInfoWarehouses
})(HelpScreen);

const styles = StyleSheet.create({
  scrollView: {
   // backgroundColor: colors.GREY_DARK,
    minHeight: '100%'
  },
  select: {
    paddingLeft: 10,
    paddingRight: 10
  },
  body: {
    paddingBottom: 20  
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
