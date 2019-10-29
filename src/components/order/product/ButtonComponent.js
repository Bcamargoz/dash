import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import colors from '../../../vars/colors';

export default class ButtonComponent extends React.Component {
    buttonPressed = () => {
        const { product } = this.props;
        const { id, status } = product;

    };

    render() {
        const { product } = this.props;
        const { status } = product;
        const buttonStyle = status === 1 ? styles.buttonStart : styles.buttonReady;
        const buttonText = status === 1 ? 'Iniciar' : 'Terminar';

        return (
            <TouchableHighlight style={{ ...styles.button, ...buttonStyle }} onPress={this.buttonPressed}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableHighlight>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        height: 50,
        justifyContent: 'center'
    },
    buttonReady: {
        backgroundColor: colors.RED,
    },
    buttonStart: {
        backgroundColor: colors.GREEN_DARK,
    },
    buttonText: {
        color: 'white',
        fontSize: 25
    }
});
