import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { stringFormat } from '../../../helpers/StringHelper';

const nameSize = 50;

export default class HeaderComponent extends React.Component {
    render() {
        const { product } = this.props;
        const { hour, name, qty } = product;

        return (
            <View style={styles.header}>
                <View style={styles.qty}>
                    <Text style={styles.text}>{qty}</Text>
                </View>
                <View style={styles.name}>
                    <Text style={styles.text}>{stringFormat(name, nameSize)}</Text>
                </View>
                <View style={styles.hour}>
                    <Text style={styles.hourText}>{hour}</Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 10
    },
    hour: {
        height: '100%',
        width: 40
    },
    hourText: {
        textAlign: 'right'
    },
    name: {
        height: '100%',
        width: 170
    },
    qty: {
        height: '100%',
        width: 40
    },
    text: {
        fontWeight: 'bold'
    }
});
