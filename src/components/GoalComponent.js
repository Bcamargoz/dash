import React from 'react'
import { View, Text } from 'react-native'
import { Circle, Svg } from 'react-native-svg';
import CardViewComponent from './CardViewComponent';
import ProgressCircle from 'react-native-progress-circle';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import formatNumber from '../services/FormatNumber';

class GoalComponent extends React.PureComponent {

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

        const { warehouse } = this.props;

        const chart = () => (
            
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 220, padding: 10}}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ paddingLeft: 20, width: '25%', textAlign: 'left', fontFamily: "Nunito-Regular", color: 'grey' }}>Meta :</Text>
                    { formatNumber(warehouse.daily_goal, null,{ paddingRight: 20, textAlign: 'right', fontFamily: "Nunito-Bold" }) }
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ paddingRight: 20, width: '25%', textAlign: 'right', fontFamily: "Nunito-Regular", color: 'grey' }}>Obtenido :</Text>
                    { formatNumber(warehouse.amount, null,{ paddingRight: 20, textAlign: 'right', fontFamily: "Nunito-Bold" }) }
                </View>
                <AnimatedCircularProgress
                    size={150}
                    width={15}
                    fill={this.calculatePercent()}
                    tintColor="rgba(34, 164, 85)"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="lightgrey" >
                        {fill => <Text >{Math.round(fill)} %</Text>}
                    </AnimatedCircularProgress>
            </View>
        )

        return (
            <>
                <CardViewComponent icon={false} titulo="Meta diaria" component={chart} ></CardViewComponent>
            </>
        )
    }

}

export default GoalComponent;