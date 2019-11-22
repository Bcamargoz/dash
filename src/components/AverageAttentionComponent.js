import React from 'react';
import { View, Text, Image } from 'react-native';
import CardViewComponent from './CardViewComponent';
import moment from 'moment';

class AverageAttentionComponent extends React.PureComponent {

    state = {
        percent: 0
    }

    calculatePercent() {
        const { warehouse } = this.props;
        if(warehouse.amount <= 0) return 0;
        const percent = (warehouse.amount * 100) / warehouse.daily_goal;
        return percent;
    }

    render() {

        const { duration } = this.props;

        const chart = () => (
            
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 220, padding: 10}}>
                <Image
                    source={require("../assets/reloj.png")}
                    style={{ width: 150, height: 150}}
                />
                <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20 }}>
                    <Text style={{ fontSize: 20, paddingLeft: 20, width: '25%', textAlign: 'left', fontFamily: "Nunito-Regular", color: '#62cb31' }}>{ moment.utc(moment.duration(duration, "minute").asMinutes()).format("HH:mm") }</Text>
                    <Text style={{ fontSize: 18, paddingLeft: 20, width: '25%', textAlign: 'left', fontFamily: "Nunito-Regular", color: 'grey' }}>Minutos</Text>
                </View>
            </View>
        )

        return (
            <>
                <CardViewComponent icon={false} titulo="Tiempo promedio de atención" component={chart} ></CardViewComponent>
            </>
        )
    }

}

export default AverageAttentionComponent;