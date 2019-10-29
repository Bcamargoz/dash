import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class HeaderComponent extends React.Component {
    render() {
        return (
            <View style={styles.header}>
                <Text>Orden No. 1000</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    header: {
        marginVertical: 20
    }
});
