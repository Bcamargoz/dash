import React from 'react'
import { View, Text } from 'react-native'
import { Circle, Svg } from 'react-native-svg';
import CardViewComponent from './CardViewComponent';
import PieChartWithCenteredLabels from './PercentPie';

class MostSoldCategoriesComponent extends React.PureComponent {

    renderData(data) {

        if (data.length === 0) {
          return (
            <Text style={{ textAlign: 'center', padding: 10 }}>Data Empty</Text>
          );
        }

        return data.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                padding: 5,
                //justifyContent: 'space-between'
              }}
            >
                <Svg height="25" width="25">
                    <Circle cx="10" cy="10" r="10" fill={item.svg.fill} />
                </Svg>
                <Text style={{fontFamily: "Nunito-Regular"}}>{item.category}</Text>
            </View>
          );
        });
      }

    render() {

        const { sales } = this.props;
        const colors = [
          "#517c8a","#4e9f86","#23ce6b","#56e39f","#87eba5"
        ]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        
        const pieData = sales
        .filter((item, index) => item.qty > 0 && index < 4)
        .map((value, index) => ({
            value: value.qty,
            svg: {
                fill: colors[index],
                onPress: () => console.log(value.category, value.percent),
            },
            key: `pie-${index}`,
            category: value.category,
            percent: value.percent
        }));

        const chart = () => (
            <View style={{  flex: 1, flexDirection: "row", paddingTop: 10 }}>
                <View style={{ width: '40%', paddingLeft: '2%' }}>
                    { this.renderData(pieData) }
                </View>
                <View style={{ width: "60%" }}>
                    <PieChartWithCenteredLabels sales={pieData} ></PieChartWithCenteredLabels>
                </View>
                
            </View>
        )

        return (
            <>
                <CardViewComponent icon={false} titulo="Categorias mas vendidas" component={chart} ></CardViewComponent>
            </>
        )
    }

}

export default MostSoldCategoriesComponent;