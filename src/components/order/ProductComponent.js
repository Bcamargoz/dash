import React from 'react';
import { StyleSheet, View } from 'react-native';
import Additions from './product/AdditionsComponent';
import Button from './product/ButtonComponent';
import Header from './product/HeaderComponent';
import Modifications from './product/ModificationsComponent';
import colors from '../../vars/colors';

export default class ProductComponent extends React.Component {
    render() {
        const { product } = this.props;
        const { additions, modifications } = product;

        return (
            <View style={styles.product}>
                <Header product={product} />
                <Additions additions={additions} />
                <Modifications modifications={modifications} />
                <Button product={product} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    product: {
        backgroundColor: colors.GREY_LIGHT,
        marginBottom: 20
    }
});
