import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BarChart, XAxis, Grid } from 'react-native-svg-charts';
import { Text as TextSvg } from 'react-native-svg';
import CardViewComponent from './CardViewComponent';
import NumberFormat from 'react-number-format';

class SalesLastSevenDaysComponent extends React.PureComponent {

    formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
        try {
          decimalCount = Math.abs(decimalCount);
          decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
      
          const negativeSign = amount < 0 ? "-" : "";
      
          let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
          let j = (i.length > 3) ? i.length % 3 : 0;
      
          return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
          console.log(e)
        }
    };

    render() {

        const { sales } = this.props;
        const data = sales.map(sale => sale.total);
        const labels = sales.map(sale => sale.date);


        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <TextSvg
                    key={ index }
                    x={ x(index) + (bandwidth / 2) }
                    y={ value < CUT_OFF ? y(value) - 10 : y(value) - 5 }
                    fontSize={ 14 }
                    fill={ value >= CUT_OFF ? 'black' : 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                >
                    {'$' + this.formatMoney(value, 0)}
                </TextSvg>
            ))
        )

        const chart = () => (
            <ScrollView horizontal={true} style={{}}>
                <View style={{ height: 210,  width: 550, padding: 20, paddingTop: 30 }}>
                    <BarChart
                        style={{ flex: 1 }}
                        data={data}
                        svg={{ fill: 'rgba(34, 164, 85, 0.8)' }}
                        contentInset={{ top: 20, bottom: 10 }}
                        spacing={0.2}
                        gridMin={0}
                        numberOfTicks={5}
                    >
                        <Grid
                            direction={Grid.Direction.HORIZONTAL}
                        />
                        <Labels/>
                    </BarChart>
                    <XAxis
                        style={{ }}
                        data={ labels }
                        formatLabel={value => labels[value].substring(0, 3)}
                        svg={{
                            fill: 'black',
                            fontSize: 14,
                            y: 5,
                        }}
                        contentInset={{ left: 20, right: 20}}
                    />
                </View>
            </ScrollView>
        )

        return (
            <>
                <CardViewComponent titulo="Ventas últimos 7 días" component={chart} ></CardViewComponent>
            </>
        )
    }

}

export default SalesLastSevenDaysComponent;