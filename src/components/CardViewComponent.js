import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class CardViewComponent extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const { component, titulo, icon = true } = this.props;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
            <View style={styles.child}>
              <View style={styles.titleView}>
                <Text style={styles.title}>{ titulo }</Text>
                { icon ? (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity>
                      <Icon name='expand' size={18} color='grey' />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ width: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                ) }
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
    paddingTop: 10                              
  },
  child: {
    width: '95%', // is 50% of container width
    borderRadius: 4,
    borderWidth: 1.2,
    borderColor: '#d6d7da',
    backgroundColor: '#fff' 
  },
  titleView: {
    padding: 10,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    color: 'grey',
    width: '94%',
    fontFamily: "Nunito-Regular"
  },
  sliderStyle: {
    width: 300,
    marginTop: 40
  }
});