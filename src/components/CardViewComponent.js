import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

export default class CardViewComponent extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
      const { component, titulo } = this.props;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
            <View style={styles.child}>
              <View style={styles.titleView}>
                <Text style={styles.title}>{ titulo }</Text>
              </View>
              { component() }
            </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,                               
  },
  child: {
    width: '95%', // is 50% of container width
    borderRadius: 4,
    borderWidth: 1.2,
    borderColor: '#d6d7da',
  },
  titleView: {
    padding: 10,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 16,
    color: 'black'
  },
  sliderStyle: {
    width: 300,
    marginTop: 40
  }
});