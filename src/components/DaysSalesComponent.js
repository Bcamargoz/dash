import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import colors from '../vars/colors'
import NumberFormat from 'react-number-format'

class DaysSalesComponent extends React.PureComponent {

  constructor() {
    super();
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

        const { info } = this.props;
        console.log(info)
        return (
            <>
               <View style={styles.grafica1}>
                    <View style={styles.itemG1}>
                        <View style={styles.itemG1img}>
                        <Image
                            source={require("../assets/world.png")}
                            style={styles.imageItem}
                        />
                        </View>
                        <View style={styles.itemG1text}>
                            <Text style={styles.textoG1}>Total de ventas</Text>
                            <NumberFormat value={Math.round10(info.amount)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={styles.textoG2}>{value}</Text>} />
                        </View>
                    </View>
                </View>
                <View style={styles.grafica1}>
                    <View style={styles.itemG1}>
                        <View style={styles.itemG1img}>
                        <Image
                            source={require("../assets/image.png")}
                            style={styles.imageItem}
                        />
                        </View>
                        <View style={styles.itemG1text}>
                            <Text style={styles.textoG1}>Total de utilidad</Text>
                            <NumberFormat value={Math.round10(info.profits)} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={styles.textoG2}>{value}</Text>} />
                        </View>
                    </View>
                </View>
                <View style={styles.grafica1}>
                    <View style={styles.itemG1}>
                        <View style={styles.itemG1img}>
                            <Image
                                source={require("../assets/utilidad2.png")}
                                style={styles.imageItem2}
                            />
                        </View>
                        <View style={styles.itemG1text}>
                            <Text style={styles.textoG1}>Gastos acumulados</Text>
                            <NumberFormat value={info.cost} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <Text style={styles.textoG2}>{value}</Text>} />
                        </View>
                    </View>
                </View>
            </>
        )
    }

}

const styles = StyleSheet.create({
    scrollView: {
     // backgroundColor: colors.GREY_DARK,
      minHeight: '100%'
    },
    statusBar: {
      backgroundColor: colors.GREY_DARK,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      flex: 1,
      width: 130,
      height: 130,
      resizeMode: 'contain' 
    },
    grafica1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 10
    },
    itemG1: {
      width: '95%', // is 50% of container width
      height: 70,
      borderRadius: 4,
      borderWidth: 1.2,
      borderColor: '#d6d7da',
      flexDirection: 'row',
    },
    itemG1img: {
      width: '40%', // is 50% of container width
      //backgroundColor: colors.GREEN_DARK,
      padding: 5,
      paddingLeft: 40,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    itemG1text: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    imageItem : {
        height: 50,
        width: 50,
    },
    imageItem2 : {
        height: 50,
        width: 50,
        marginLeft: 10
    },
    chart : {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 20
    },
    textoG1 : {
        fontSize: 14,
        color: 'grey'
    },
    textoG2 : {
        fontSize: 18,
    }
  });

export default DaysSalesComponent
