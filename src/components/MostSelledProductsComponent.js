import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import NumberFormat from 'react-number-format'

import CardViewComponent from './CardViewComponent';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

export default class MostSelledProducstComponent extends Component {
  constructor(props) {
    super(props);
    (function() {
      /**
       * Ajuste decimal de un número.
       *
       * @param {String}  tipo  El tipo de ajuste.
       * @param {Number}  valor El numero.
       * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
       * @returns {Number} El valor ajustado.
       */
      function decimalAdjust(type, value, exp) {
        // Si el exp no está definido o es cero...
        if (typeof exp === 'undefined' || +exp === 0) {
          return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Si el valor no es un número o el exp no es un entero...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
          return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
      }
    
      // Decimal round
      if (!Math.round10) {
        Math.round10 = function(value, exp) {
          return decimalAdjust('round', value, exp);
        };
      }
      // Decimal floor
      if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
          return decimalAdjust('floor', value, exp);
        };
      }
      // Decimal ceil
      if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
          return decimalAdjust('ceil', value, exp);
        };
      }
    })();
  }
  

  render() {
   const renderData = () => {
        const { sales } = this.props;
        let sum = 0;
        console.log(sales);
       
        if (sales.length === 0) {
          return (
            <>
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10}}>
                <Icon name='shopping-bag' size={40} color='grey' />
                <Text style={{ textAlign: 'center', fontFamily: 'Nunito-Regular', padding: 10 }}>  No hay ventas aun!</Text>
              </View>
            </>
          );
        }
        /**
          image: "http://pos.vendty.com/uploads//vendty2_db_11091_modav2017/imagenes_productos/collar3.jpg"
          name: "Collar ger III"
          qty: 1
         */
        return <ScrollView style={{ height: 250 }}><View>
        {sales.map((item, index) => {
          return (
            <View
              key={item.code}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-around'
              }}
            >
              <View style={{ width: '20%'}}>
                { item.image.includes("pos.vendty.com") ? 
                        <Image
                            source={{uri:item.image}}
                            style={styles.imageItem}
                        /> : 
                        <Image
                            source={{uri:"http://pos.vendty.com//uploads/default.png"}}
                            style={styles.imageItem}
                        /> }
              </View>
              <View style={{ width: '60%'}}>
                <Text style={{ fontSize: 16, paddingLeft: 10,  color: 'grey', fontFamily: "Nunito-Regular" }}>{item.name}</Text>
              </View>
              <View style={{ width: '20%'}}>
                <Text style={{ fontSize: 18, textAlign: 'right', paddingRight: 10, fontFamily: "Nunito-Bold" }}>{item.qty}</Text>
              </View>
            </View>
          );
        })}
        </View></ScrollView>
      }

    return (
        <CardViewComponent icon={false} titulo="Productos mas vendidos del día" component={renderData}></CardViewComponent>
    );
  }
}
const styles = StyleSheet.create({
    imageItem : {
        height: 60,
        width: 60,
        borderRadius: 5
    }
});