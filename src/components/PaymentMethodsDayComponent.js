import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import NumberFormat from 'react-number-format'

import CardViewComponent from './CardViewComponent';

export default class PaymentMethodsDayComponent extends Component {
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
            <Text style={{ textAlign: 'center', padding: 10 }}>Data Empty</Text>
          );
        }
        return <View>
        {sales.map((item, index) => {
            sum +=  parseFloat(item.total);
            if(sales.length - 1 === index) {
                return (
                    <>
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
                            {item.code === 'efectivo' ? 
                                    <Image
                                        source={require("../assets/efectivo.png")}
                                        style={styles.imageItem}
                                    /> : 
                                    <Image
                                        source={require("../assets/debito.png")}
                                        style={styles.imageItem}
                                    /> }
                          </View>
                          <View style={{ width: '40%'}}>
                            <Text style={{ fontSize: 18 }}>{item.name}</Text>
                          </View>
                          <View style={{ width: '40%' }}>
                            <NumberFormat value={Math.round10(item.total)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={{ fontSize: 18, textAlign: 'right', paddingRight: 10 }}>{value}</Text>} />
                          </View>
                        </View>
                        <View
                            key="total"
                            style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            padding: 10,
                            justifyContent: 'space-around'
                            }}
                        >
                          <View style={{ width: '40%'}}>
                            <Text style={{ fontSize: 18 }}>Total: </Text>
                          </View>
                          <View style={{ width: '40%'}}>
                            <NumberFormat value={sum} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={{ fontSize: 18 }}>{value}</Text>} />
                          </View>
                        </View>
                    </>
                )
            }
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
                {item.code === 'efectivo' ? 
                        <Image
                            source={require("../assets/efectivo.png")}
                            style={styles.imageItem}
                        /> : 
                        <Image
                            source={require("../assets/debito.png")}
                            style={styles.imageItem}
                        /> }
              </View>
              <View style={{ width: '40%'}}>
                <Text style={{ fontSize: 18 }}>{item.name}</Text>
              </View>
              <View style={{ width: '40%'}}>
                <NumberFormat value={Math.round10(item.total)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={{ fontSize: 18, textAlign: 'right', paddingRight: 10 }}>{value}</Text>} />
              </View>
            </View>
          );
        })}
        </View>
      }

    return (
        <CardViewComponent titulo="Metodos de pago" component={renderData}></CardViewComponent>
    );
  }
}
const styles = StyleSheet.create({
    imageItem : {
        height: 35,
        width: 35
    }
});