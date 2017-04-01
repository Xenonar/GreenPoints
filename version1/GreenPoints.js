/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

export default class MainScreen extends Component {
  render() {
    return (
      <Image
        style={styles.container}
        source={require('./greenpoint_img/greenPointsBG.png')}>
        <View style={styles.itemcontainer}>
          <Image
            style = {styles.logoimg}
            source={require('./greenpoint_img/greenPointsLogoText.png')}
          />
        </View>
        <View style={[styles.itemcontainer,{marginTop:5}]}>
          <Text style={styles.instructions}>Do green, earn points, profit!.</Text>
        </View>
        <View style={styles.itemcontainer}>
          <TextInput
            placeholder='Enter username'
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
          />
        </View>
        <View style={[styles.itemcontainer,{marginTop:10}]}>
          <TextInput
            placeholder ='Enter password'
            keyboardType = 'default'
            secureTextEntry = {true}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
          />
        </View>
        <View style={[styles.itemcontainer, {flexDirection:'row'}]}>
          <TouchableOpacity style={[styles.button,{flex:1}]}>
          <Text style={styles.buttontext}>Login</Text>
          </TouchableOpacity>
          <Text style={[styles.buttontext,{flex:0.1}]}></Text>
          <TouchableOpacity style={[styles.button,{flex:1}]}>
          <Text style={styles.buttontext}>Register</Text>
        </TouchableOpacity>
        </View>
        <View style={[styles.itemcontainer,{marginTop:10}]}>
          <TouchableOpacity style={[styles.button,{backgroundColor:'#3b5998'}]}>
          <Text style={styles.buttontext}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.itemcontainer,{marginTop:20}]}>
          <TouchableOpacity>
            <Text style={[styles.instructions, { color: 'white'}]}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  appnametext: {
    fontSize: 60,
    fontWeight: 'bold',
    textShadowColor: 'grey',
    textShadowOffset: {width: 2.5, height: 2.5},
    textAlign: 'center',
    color: 'white',
  },
  instructions: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333333',
  },
  textinput: {
    fontSize: 20,
    width: Dimensions.get('window').width * .8,
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgba(34,125,63,0.6)',
    backgroundColor: 'white',


  },
  itemcontainer: {
    marginTop: 20,
    width: Dimensions.get('window').width * .8,
  },
  button: {
    backgroundColor: 'rgba(34,125,63,1)',
    padding: 10,
    borderRadius: 5,
  },
  buttontext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  logoimg: {
    padding: 10,
    resizeMode: 'cover',
    width: 310,
    height: 75,
  },
});

AppRegistry.registerComponent('version1', () => MainScreen);
