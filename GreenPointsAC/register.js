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
  Keyboard,
  Alert,
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class registerscreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorTxt: '',
      errorBG: 'rgba(255,255,255,0)',
      rpassword: '',
      rconfirmpw: '',
      remail: '',
    }
    this._handleRegister = this._handleRegister.bind(this);

  }
  _handleRegister(){
    let thisState = this;
    Keyboard.dismiss();
    if (this.state.rconfirmpw == this.state.rpassword && this.state.rpassword != ''){
      firebase.auth().createUserWithEmailAndPassword(this.state.remail,this.state.rpassword).then((result) => {
        Alert.alert('GreenPoints','Successfully registered to GreenPoints, The system will automatically login');
        thisState._handleRegToLogin();
      },(error) => {
        // Handle Errors here.

        console.log(error.message);
        thisState.setState({errorTxt: error.message, errorBG: 'rgba(228,78,61,1)'});

        // ...
      })

    }else if (this.state.rpassword == '' || this.state.remail=='' || this.state.rconfirmpw =='') {
      this.setState({errorTxt:'Please make sure you have filled all information!', errorBG: 'rgba(228,78,61,1)'});
    }else{
      this.setState({errorTxt:'Confirm password and Password must be the same!', errorBG: 'rgba(228,78,61,1)'});
    }
  }
  _handleRegToLogin(){
    Keyboard.dismiss();
    let thisState = this;
    firebase.auth().signInWithEmailAndPassword(this.state.remail,this.state.rpassword).then((result) =>{
      //Promise was successful
      var user = firebase.auth().currentUser;
      if (user != null) {
        var userId = user.uid;
        var db = firebase.database();
        db.ref('users/' + userId).set({
          usertype: 'Member',
          coupon: {},
          points: 0,
        });
      }
      thisState.props.navigator.push({index:5, passProps:{}});
    },(error) => {
      //Promise was rejected
      // Handle Errors here.
      console.log(error.message);
      thisState.setState({errorTxt: error.message});
      })

  }
  render() {
    return (
      <Image
        style={styles.container}
        source={require('./greenpoint_img/greenPointsBG.png')}>
        <KeyboardSpacer />
        <View style={[styles.itemcontainer,{flexDirection:'row',marginTop:10}]}>
          {emailIcon}
          <Text style={styles.titletext}> Email:</Text>
        </View>
        <View style={[styles.itemcontainer,{marginTop:0}]}>
          <TextInput
            placeholder='example@yourmail.com'
            keyboardType = 'email-address'
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({remail:txt})}
          />
        </View>
        <View style={[styles.itemcontainer,{flexDirection:'row',marginTop:10}]}>
          {pwIcon}
          <Text style={styles.titletext}> Password:</Text>
        </View>
        <View style={[styles.itemcontainer,{marginTop:0}]}>
          <TextInput
            placeholder='Enter password'
            maxLength={20}
            keyboardType = 'default'
            secureTextEntry = {true}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({rpassword:txt})}
          />

        </View>
        <View style={[styles.itemcontainer,{flexDirection:'row',marginTop:10}]}>
          {pwIcon}
          <Text style={styles.titletext}> Confirm Password:</Text>
        </View>
        <View style={[styles.itemcontainer,{marginTop:0}]}>
          <TextInput
            placeholder='Enter password'
            maxLength={20}
            keyboardType = 'default'
            secureTextEntry = {true}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({rconfirmpw:txt})}
          />
        </View>

        <View style={styles.itemcontainer}>
          <TouchableOpacity
            style={[styles.button,{flexDirection:'row',justifyContent:'center'}]}
            onPress={()=>this._handleRegister()}>
            {confirmIcon}<Text style={styles.buttontext}> Confirm</Text>
          </TouchableOpacity>

        </View>
        <View style={[styles.errorcontainer,{  backgroundColor:this.state.errorBG}]}>
          <Text style={[styles.instructions,{ color: 'white'}]}>{this.state.errorTxt}</Text>
        </View>
      </Image>
    );
  }

}
const userIcon = (<Icon name="user" size={25} color="#fff" />)
const pwIcon = (<Icon name="lock" size={25} color="#fff" />)
const confirmIcon = (<Icon name="check-circle-o" size={25} color="#fff" />)
const emailIcon = (<Icon style={{marginTop:2.5}} name="envelope" size={20} color="#fff" />)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  titletext: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'grey',
    textShadowOffset: {width: 2.5, height: 2.5},
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
  errorcontainer: {
    marginTop: 20,
    width: Dimensions.get('window').width * .8,
    padding: 2,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 5
  },
  button: {
    backgroundColor: 'rgba(44,125,73,1)',
    padding: 10,
    borderRadius: 5,
    borderColor: 'rgba(255,255,255,.75)',
    borderWidth: 2 ,
  },
  buttontext: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  logoimg: {
    alignItems: 'center',
    resizeMode: 'cover',
    width: Dimensions.get('window').width * .8,
    height: 75,
  },
  navigationBar: {
    justifyContent: 'center',
    backgroundColor:'rgba(34,125,63,1)',
  },
  navigationBarText: {
    color: 'white',
    marginLeft: 10,
    marginTop: 15,
    fontSize: 20,
    backgroundColor:'pink',
  },
  navigationBarTitleText: {
    marginTop: 10,
    fontSize: 25,
    color: 'white',
    backgroundColor: 'pink',
  },
});
