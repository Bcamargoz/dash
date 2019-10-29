import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import Header from './HeaderComponent';

export default class AdditionsComponent extends React.Component {
    render() {
        const { additions } = this.props;

        if (Array.isArray(additions) && additions.length) {
            return (
                <>
                    <Text style={styles.header}>ADICIONES</Text>
                    <FlatList
                        data={additions}
                        keyExtractor={(addition) => addition.name}
                        listKey={() => 'additions'}
                        renderItem={({ item: addition }) => <Header product={addition} />}
                    />
                </>
            );
        } else {
            return null;
        }
    }
};

const styles = StyleSheet.create({
    header: {
        borderTopWidth: .5,
        borderBottomWidth: .5,
        fontSize: 12,
        textAlign: 'center'
    }
});
