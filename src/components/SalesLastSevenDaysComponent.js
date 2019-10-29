import React from 'react'
import { View, Text } from 'react-native'
import { BarChart, XAxis, Grid } from 'react-native-svg-charts'
import { Text as TextSvg } from 'react-native-svg'
import CardViewComponent from './CardViewComponent';

class SalesLastSevenDaysComponent extends React.PureComponent {

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
                    {value}
                </TextSvg>
            ))
        )

        const chart = () => (
            <View style={{}}>
            <View style={{ height: 210, padding: 20, paddingTop: 30 }}>
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
                </View>
        )

        return (
            <>
                <CardViewComponent titulo="Ventas últimos 7 días" component={chart} ></CardViewComponent>
            </>
        )
    }

}

export default SalesLastSevenDaysComponent;