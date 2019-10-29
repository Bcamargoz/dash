import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import Header from './HeaderComponent';

export default class AdditionsComponent extends React.Component {
    render() {
        const { modifications } = this.props;

        if (Array.isArray(modifications) && modifications.length) {
            return (
                <>
                    <Text style={styles.header}>MODIFICACIONES</Text>
                    <FlatList
                        data={modifications}
                        keyExtractor={(modification) => modification.name}
                        listKey={() => 'modifications'}
                        renderItem={({ item: modification }) => <Header product={modification} />}
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
