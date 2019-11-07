import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

class PieChartWithCenteredLabels extends React.PureComponent {

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

        const { sales } = this.props;
        const data = sales;

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={18}
                        fontFamily={"Nunito-Bold"}
                        stroke={'black'}
                        strokeWidth={0.5}
                    >
                        {Math.round10(data.percent)}%
                    </Text>
                )
            })
        }

        return (
            <PieChart
              style={{ height: 150 }}
              valueAccessor={({ item }) => item.percent}
              data={data}
              spacing={0}
              outerRadius={'95%'}
            >
              <Labels/>
            </PieChart>
        )
    }

}

export default PieChartWithCenteredLabels