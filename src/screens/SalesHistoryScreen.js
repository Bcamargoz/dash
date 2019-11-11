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
import formatNumber from '../services/FormatNumber';
import colors from '../vars/colors';


import { connect } from 'react-redux';
import { 
    getSalesHistory
} from '../actions/chartActions';
import { getLoginBetaData, logout } from '../actions/authActions';

import moment from 'moment';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

class SalesHistoryScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      app: 'dashboard',
      warehouseSelected: 0,
      warehouseId: 0,
      days: 7,
    }
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const { getLoginBetaData } = this.props;
    const data = await getLoginBetaData();
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
      getSalesHistory
    } = this.props;
    const { days } =  this.state;
    getSalesHistory(email)
  }
  

  formatName = (name) => {
    name = name.replace(/-/g, " ");
    name = name.replace(/_/g, " ");
    name = name.toUpperCase();
    return name;
  }

  compare(a, b){
    /**
    count_productos
    utilidad
    precio_venta
    */
    const totalA = parseFloat(a.count_productos) * parseFloat(a.precio_venta);
    const totalB = parseFloat(b.count_productos) * parseFloat(b.precio_venta);
    if (totalA < totalB) return 1;
    if (totalB < totalA) return -1;
    return 0;
  }

  render() {
    //this.loadData();
    const {
      warehouses,
      salesHistory
    } = this.props;

    const { warehouseId } = this.state;
    const reportData = salesHistory.filter(warehouse => warehouse.id_almacen == warehouseId);

    const selectWarehouse = (warehouses) => {
        if(warehouses.length > 1) {
          return (
          <View style={styles.select}>
            <Text style={{ fontSize: 14, color: 'grey', paddingTop: 10, fontFamily: "Nunito-Regular" }}>Selecciona un almacen:</Text>
            <Picker
              selectedValue={this.state.warehouseId}
              style={{ height: 50, fontFamily: "Nunito-Regular" }}
              mode={'dialog'}
              onValueChange={(itemValue) =>  {
                this.setState({ warehouseId: itemValue })
              }}
              >
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
                        { reportData[0] ? formatNumber(reportData[0].ventas_diarias,  reportData[0].simbolo, { fontSize: 20, textAlign: 'right'}) : formatNumber(0, null, { fontSize: 20, textAlign: 'right'}) }
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Total de gastos:</Text>
                    </View>
                    <View style={{ }}>
                        { reportData[0] ? formatNumber(reportData[0].total_gastos,  reportData[0].simbolo, { fontSize: 20, textAlign: 'right'}) : formatNumber(0, null, { fontSize: 20, textAlign: 'right'}) }
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Total de utilidad: </Text>
                    </View>
                    <View style={{}}>
                      { reportData[0] ? formatNumber(reportData[0].total_utilidad,  reportData[0].simbolo, { fontSize: 20, textAlign: 'right'}) : formatNumber(0, null, { fontSize: 20, textAlign: 'right'}) }
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Devoluciones: </Text>
                    </View>
                    <View style={{}}>
                        { reportData[0] ? formatNumber(reportData[0].devoluciones,  reportData[0].simbolo, { fontSize: 20, textAlign: 'right'}) : formatNumber(0, null, { fontSize: 20, textAlign: 'right'}) }
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Formas de pago: </Text>
                    </View>
                    <View >
                      {
                        reportData[0] ? reportData[0].total_formas_pago.length > 0 ?
                          reportData[0].total_formas_pago.map(venta => 
                            <View style={{
                                justifyContent: 'space-between',
                                flex: 1,
                                alignItems: 'center',
                                flexDirection: 'row'                                
                              }}
                              key={venta.forma_pago}>
                              <Text style={{ fontSize: 16, color: 'grey',  textAlign: 'left' }}>{this.formatName(venta.forma_pago)} </Text>
                              { formatNumber(venta.total_venta,  reportData[0].simbolo, { fontSize: 20, textAlign: 'right'})}
                            </View>
                          ) :
                          <Text style={{ fontSize: 20,  textAlign: 'right' }}>$ 0 </Text>
                        : 
                        <Text style={{ fontSize: 20,  textAlign: 'right' }}>$ 0 </Text>
                      }
                    </View>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.child}>
                    <View style={{}}>
                        <Text style={{ fontSize: 18 }}>Productos mas vendidos: </Text>
                    </View>
                    <View style={{}}>
                      {
                        /**
                          imagen
                          count_productos
                          utilidad
                          precio_venta
                         */
                        
                        reportData[0] ? reportData[0].productos_mas_vendidos.length > 0 ?
                          reportData[0].productos_mas_vendidos.sort(this.compare).map(producto => 
                            <View style={{
                                justifyContent: 'space-between',
                                flex: 1,
                                alignItems: 'center',
                                flexDirection: 'row',
                              }}
                              key={producto.nombre}>
                              <Text style={{ width: '50%', fontSize: 16, color: 'grey',  textAlign: 'left' }}>{producto.nombre.slice(0, 20)} </Text>
                              { formatNumber((parseFloat(producto.count_productos) * parseFloat(producto.precio_venta)),  reportData[0].simbolo, { fontSize: 20, textAlign: 'right'})}
                            </View>
                          ) :
                          <Text style={{ fontSize: 20,  textAlign: 'right' }}>$ 0 </Text>
                        : 
                        <Text style={{ fontSize: 20,  textAlign: 'right' }}>$ 0 </Text>
                      }
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
    getSalesHistory,
    getLoginBetaData
})(SalesHistoryScreen);

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: colors.GREY_DARK,
     minHeight: '100%',
     backgroundColor: "#f1f3f6"
   },
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
