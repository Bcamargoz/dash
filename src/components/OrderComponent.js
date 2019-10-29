import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/order/HeaderComponent';
import Product from '../components/order/ProductComponent';
import colors from '../vars/colors';
import { FlatList } from 'react-native-gesture-handler';

export default class OrderComponent extends React.Component {
    render() {
        const { order } = this.props;
        const { products } = order;

        return (
            <View style={styles.container}>
                <Header />
                <FlatList
                    data={products}
                    keyExtractor={(product) => product.id.toString()}
                    renderItem={({ item: product }) => <Product product={product} />}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.GREY,
        borderRadius: 5,
        margin: 20,
        marginRight: 0,
        paddingHorizontal: 20
    }
});
