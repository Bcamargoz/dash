import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Picker,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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
  getInfoWarehouses,
  setIntervalRequest,
  getDeliveries,
  getMostSelledProducts,
  getAverageAtention

} from '../actions/chartActions';
import { getLoginData, getLoginBetaData, logout } from '../actions/authActions';
import SalesXHourComponent from '../components/SalesXHourComponent';
import SalesLastSevenDaysComponent from '../components/SalesLastSevenDaysComponent';
import InfoWarehouseComponent from '../components/InfoWarehouseComponent';
import DishesXHourComponent from '../components/DishesXHourCompnent';
import MostSoldCategoriesComponent from '../components/MostSoldCategoriesComponent';
import PaymentMethodsDayComponent from '../components/PaymentMethodsDayComponent';
import DaysSalesComponent from '../components/DaysSalesComponent';
import DeliveriesComponent from '../components/DeliveriesComponent';
import MostSelledProducstComponent from '../components/MostSelledProductsComponent';
import AverageAttentionComponent from '../components/AverageAttentionComponent';

import firebase from "react-native-firebase";
import moment from 'moment';

import Icon from 'react-native-vector-icons/dist/FontAwesome';
import GoalComponent from '../components/GoalComponent';

class HomeScreen extends React.Component {

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
      //notificationTime: moment().add(5, 'seconds'),
      notificationTime: moment({ hour: 7 }),
      data: { value: false }
      
    }
  }

  componentDidMount() {
    this.init();
    // Create notification channel required for Android devices
    this.createNotificationChannel();
  
    // Ask notification permission and add notification listener
    this.checkPermission();

    this.setReminder();
  }

  componentDidUpdate(prevProps, prevState) {
    const { notificationTime, enableNotification } = this.state;

    if (enableNotification !== prevState.enableNotification || notificationTime !== prevState.notificationTime) {
      this.setReminder();
    }
  }

  setReminder = async () => {
    const { notificationTime, enableNotification } = this.state;
    reminder = await AsyncStorage.getItem('reminder')
    reminder = JSON.parse(reminder);
    console.warn(reminder);
    if(!reminder) {
      console.warn('se registra la notificacion')
      if (enableNotification) {
        firebase.notifications().scheduleNotification(this.buildNotification(), {
          fireDate: notificationTime.valueOf(),
          repeatInterval: 'day',
          exact: true,
        });
        AsyncStorage.setItem('reminder', JSON.stringify({ reminder: true}))
      } else {
        return false;
      }
    }
    
  };

  buildNotification = () => {
    const title = Platform.OS === 'android' ? 'Informe Diario' : '';
    const notification = new firebase.notifications.Notification()
      .setNotificationId(Math.random().toString())
      .setTitle(title)
      .setSubtitle("Vendty")
      .setBody('Tu informe diario de ventas esta listo!')
      .android.setPriority(firebase.notifications.Android.Priority.Max)
      .android.setChannelId('reminder')
      .android.setAutoCancel(true)
      .android.setSmallIcon('ic_push2') 
      .android.setLargeIcon("ic_push")
      .android.setVibrate([1000, 1000])
      .android.setBigText("Vendty", "Informe de ventas listo", "Informe del " + moment().subtract(1, 'day').format("DD/MM/YYYY"))
      .android.setBadgeIconType(firebase.notifications.Android.BadgeIconType.Large)
      .android.setDefaults([firebase.notifications.Android.Defaults.Vibrate]);

    firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { navigation } = this.props;
      navigation.navigate('SalesHistory');
    });

    // Build an action
    const action = new firebase.notifications.Android.Action('ver_informe', 'ic_push', 'Ver informe');
    // Add the action to the notification
    notification.android.addAction(action);

    return notification;
  };

  createNotificationChannel = async () => {
    // Build a android notification channel
    const channel = new firebase.notifications.Android.Channel(
      "reminder", // channelId
      "Reminders Channel", // channel name
      firebase.notifications.Android.Importance.Max // channel importance
    ).setDescription("Used for getting reminder notification"); // channel description
    // Create the android notification channel
    firebase.notifications().android.createChannel(channel);
  };
  
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // We've the permission
      this.notificationListener = firebase
        .notifications()
        .onNotification(async notification => {
          // Display your notification
          await firebase.notifications().displayNotification(notification);
        });
    } else {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        Alert.alert("No se puede acceder al permiso de notificación. Habilite el Permiso de notificación desde la configuración");
      }
    }
  };

  async init() {
    
    const { getLoginData, getWarehouses, getLoginBetaData, setIntervalRequest } = this.props;
    getWarehouses();
    const data = await getLoginData();
    const dataBeta = await getLoginBetaData();
    this.setState({ auth: data, warehouseSelected: data.warehouse.id }, () => {this.loadData(data.warehouse.id)});
    const interval = setInterval(() => {
      this.loadData(this.state.warehouseSelected);
    }, 60000)
    setIntervalRequest(interval);
    let data2 = await AsyncStorage.getItem(`first`);
    this.setState({
      data: JSON.parse(data2)
    })
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
      getInfoWarehouses,
      getDeliveries,
      getMostSelledProducts,
      getAverageAtention
    } = this.props;
    const { days, auth } =  this.state;
    getSalesXhour(warehouseId);
    getLastSevenDays(warehouseId);
    getWarehouse(warehouseId);
    getMostSoldCategories(warehouseId);
    if(auth.type_business !== 'retail'){
      getDishesSoldPerday(warehouseId);
    }
    getPaymentsMethodsOfday(warehouseId);
    getInfoWarehouses(warehouseId, days);
    getDeliveries(warehouseId);
    getMostSelledProducts(warehouseId);
    getAverageAtention(warehouseId);
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
      daySales,
      deliveries,
      mostSelledProducts,
      averageAtention
    } = this.props;    

    const { auth } = this.state;

    const selectWarehouse = (warehouses) => {
      if(warehouses.length > 1) {
        return (
        <View style={styles.select}>
          <Text style={{ fontSize: 14, color: 'grey', paddingTop: 10, fontFamily: "Nunito-Regular" }}>Selecciona un almacen:</Text>
          <Picker
            selectedValue={this.state.warehouseSelected}
            style={{ 
              height: 50, 
              fontFamily: "Nunito-Regular"
            }}
            itemStyle={{ 
              fontFamily: "Nunito-Regular"
             }}
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
            <Text style={{ fontFamily: "Nunito-Regular", fontSize: 20 }}>Información de tu almacen</Text>
            <Text style={{ fontFamily: "Nunito-Regular" }}>{ !warehouses[0] ? '' : warehouses[0].name }</Text>
          </View>
      }
      
    }
    //console.log(infoWarehouse);

    const {days, notificationTime, data} = this.state;
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
            {/** Almacen */}
            <InfoWarehouseComponent info={infoWarehouse}></InfoWarehouseComponent>
            {/** Almacen */}

            {/** Grafica ventas por hora */}
            <SalesXHourComponent sales={salesXhour}></SalesXHourComponent>
            {/** Grafica ventas por hora */}

            {/** Grafica ventas por hora */}
            <SalesLastSevenDaysComponent sales={salesLastSevenDays}></SalesLastSevenDaysComponent>
            {/** Grafica ventas por hora */}

            {/** Grafica ventas por hora */}
            {
              auth.type_business == 'restaurante' || auth.type_business == 'Restaurante' ? <DishesXHourComponent sales={dishesXday ? dishesXday : []}></DishesXHourComponent> : <View></View>
            }
            {/** Grafica ventas por hora */}

            {/** Grafica categorias mas vendidas */}
            <MostSoldCategoriesComponent sales={mostSoldCategories}></MostSoldCategoriesComponent>
            {/** Grafica categorias mas vendidas */}


            {/** Domicilios del dia */}
            {
              auth.type_business == 'restaurante' || auth.type_business == 'Restaurante' ? <DeliveriesComponent sales={deliveries}></DeliveriesComponent> : <View></View> 
            }
            {/** Domicilios del dia */}

            {/** Grafica metodos de pago */}
            <PaymentMethodsDayComponent sales={paymentsMethodsOfday}></PaymentMethodsDayComponent>
            {/** Grafica metodos de pago */}

            {/** Grafica de meta diaria */}
            <GoalComponent warehouse={infoWarehouse}></GoalComponent>
            {/** Grafica de meta diaria */}
            
            {/** Grafica productos mas vendidos */}
            <MostSelledProducstComponent sales={mostSelledProducts}></MostSelledProducstComponent>
            {/** Grafica productos mas vendidos */}

            {/** Grafica promedio de atencion */}
            {
              auth.type_business == 'restaurante' || auth.type_business == 'Restaurante' ? <AverageAttentionComponent duration={averageAtention}></AverageAttentionComponent> : <View></View> 
            }
            {/** Grafica promedio de atencion */}

            {/** Almacen */}
            <View style={styles.containerButton}>
                <TouchableWithoutFeedback onPress={() => this.setDays(7)}>
                  <View style={{ width: '33%', height: 40, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: days == 7 ? '#545b62' : '#6c757d', borderBottomLeftRadius: 15,  borderTopLeftRadius: 15  }}>
                    <Text style={{ color:'#fff' }}>7 dias</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.setDays(14)}>
                  <View style={{ width: '33%', height: 40, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: days == 14 ? '#545b62' : '#6c757d'  }}>
                    <Text style={{ color:'#fff' }}>14 dias</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.setDays(30)}>
                  <View style={{ width: '33%', height: 40, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: days == 30 ? '#545b62' : '#6c757d', borderBottomRightRadius: 15, borderTopRightRadius: 15  }}>
                    <Text style={{ color:'#fff' }}>30 dias</Text>
                  </View>
                </TouchableWithoutFeedback>
            </View>
            <DaysSalesComponent info={daySales}></DaysSalesComponent>
            {/** Almacen */}
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
    daySales: state.chart.infoWarehouse,
    deliveries: state.chart.deliveries,
    mostSelledProducts: state.chart.mostSelledProducts,
    averageAtention: state.chart.averageAtention
  }
}

export default connect(mapStateToProps, { 
  logout,
  getSalesXhour, 
  getLoginData,
  getLoginBetaData,
  getLastSevenDays, 
  getWarehouse,
  getWarehouses,
  getMostSoldCategories,
  getDishesSoldPerday,
  getPaymentsMethodsOfday,
  getInfoWarehouses,
  setIntervalRequest,
  getDeliveries,
  getMostSelledProducts,
  getAverageAtention
})(HomeScreen);

const styles = StyleSheet.create({
  scrollView: {
   // backgroundColor: colors.GREY_DARK,
    minHeight: '100%',
    backgroundColor: '#f1f3f6'
  },
  select: {
    paddingLeft: 5,
    paddingRight: 5
  },
  body: {
    paddingBottom: 20,
    backgroundColor: "#f1f3f6"
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
    paddingRight: '2.5%',
    paddingTop: 10,
  },
  buttonContainer: {
      flex: 1,
  },
  menu: {
    width: 50,
  },
});
