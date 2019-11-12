import React from 'react'
import { AreaChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import { View, Text } from 'react-native'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as dateFns from 'date-fns'
import { Path } from 'react-native-svg'
import colors from '../vars/colors'
import CardViewComponent from './CardViewComponent'
import { ScrollView } from 'react-native-gesture-handler'

class SalesXHourComponent extends React.PureComponent {

    render() {

        const { sales } = this.props;
        let data1 = [];
        let data2 = [];
        let labels2 = [];
        let labels1 = [];
        let dataTotal = [];
        let labelTotal = [];

        sales.map( (sale, index) => {
            if(index < 12) {
                data1.push({
                    value: sale.total,
                    date: dateFns.setHours(new Date(), index)
                })
                labels1.push(sale.total)
            } else {
                data2.push({
                    value: sale.total,
                    date: dateFns.setHours(new Date(), index)
                })
                labels2.push(sale.total)
            }
            dataTotal.push({
                value: sale.total,
                date: dateFns.setHours(new Date(), index)
            })
            labelTotal.push(sale.total)
        });

        const axesSvg = { fontSize: 10, fill: 'black' };

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={colors.GREEN_VENDTY}
                fill={'none'}
            />
        )

        const chart2 = () => (
            <ScrollView horizontal={true} style={{}}>
                <View style={{ height: 200, width: 800, padding: 10, flexDirection: 'row' }}>
                    <YAxis
                        data={labelTotal}
                        style={{ marginBottom: 10 }}
                        contentInset={{ top: 3, bottom: 20 }}
                        svg={axesSvg}
                        numberOfTicks={5}
                    />

                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <AreaChart
                            style={{ flex: 1 }}
                            data={ dataTotal }
                            yAccessor={ ({ item }) => item.value }
                            xAccessor={ ({ item }) => item.date }
                            xScale={ scale.scaleTime }
                            contentInset={{ top: 0, bottom: 10 }}
                            svg={{ fill: 'rgba(34, 164, 85, 0.5)' }}
                            curve={ shape.curveMonotoneX }
                            numberOfTicks={5}
                        >
                            <Grid svg={{
                                strokeWidth: 1,
                                strokeOpacity: 0.3
                            }}/> 
                            <Line />
                        </AreaChart>
                        <XAxis
                            data={ dataTotal }
                            svg={{
                                fill: 'black',
                                fontSize: 10,
                                fontWeight: 'bold',
                                y: 5,
                                fontFamily:"Nunito-Regular"
                            }}
                            xAccessor={ ({ item }) => item.date }
                            scale={ scale.scaleTime }
                            style={{ marginHorizontal: -15, height: 20 }}
                            contentInset={{ left: 20, right: 25 }}
                            formatLabel={ (value) => dateFns.format(value, 'HH') }
                        />
                    </View>
                </View>
            </ScrollView>
        );

        return (
            <>
                <CardViewComponent  icon={false} titulo="Ventas ultimas 24 horas" component={chart2} ></CardViewComponent>
            </>
        )
    }

}

export default SalesXHourComponent

