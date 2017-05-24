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
import DismissKeyboard from 'dismissKeyboard';
import FBSDK, { LoginManager , AccessToken} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class loginscreen extends Component {
  constructor(props){
    super(props);
    this._fbAuth = this._fbAuth.bind(this);
    this._handleLogin = this._handleLogin.bind(this);
    this._onPressRegister = this._onPressRegister.bind(this);
    this.state = {
      lemail:'',
      lpassword:'',
      errorTxt: '',
    }
  }
  _fbAuth(){
    let thisState = this;
    Keyboard.dismiss();
    LoginManager.logInWithReadPermissions(['public_profile','email']).then(function(result) {
      if (result.isCancelled){
        thisState.setState({errorTxt:'Facebook login was cancelled'});
      } else {
          AccessToken.getCurrentAccessToken().then((accessTokenData) => {
            const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
            firebase.auth().signInWithCredential(credential).then((result) =>{
              //Promise was successful
              var user = firebase.auth().currentUser;
              if (user != null) {
                var userId = user.uid;
                var db = firebase.database();
                var refPointsStr = "users/"+userId+"/points";
              	var refPoints = db.ref(refPointsStr);
                refPoints.on("value", function(snapshot) {
                  var initPoint = snapshot.val();
              		if(initPoint == null){
                    db.ref('users/' + userId).set({
                      position: {lat:0 , long:0},
                      coupon: {},
                      points: 0,
                    });
                  }
                }, function (errorObject) {
                console.log("Failed to read data: " + errorObject.code);
                });
              }
              thisState.setState({errorTxt:''});
              thisState.props.navigator.push({index:5, passProps:{}});
            },(error) => {
              //Promise was rejected
              thisState.setState({errorTxt:error});
              console.log('An error occured:' + error)
            })
          }, (error => {
            console.log('An error occured:' + error)
            thisState.setState({errorTxt:error});
          }))
      }
    },
      function(error){
        console.log('An error has occurred:' + error);
        thisState.setState({errorTxt:error});
      }
    );
  }
  _onPressRegister(){
    this.setState({errorTxt:''});
    this.props.navigator.push({index:3, passProps:{}});
    Keyboard.dismiss();
  }
  _handleLogin(){
    Keyboard.dismiss();
    let thisState = this;
    firebase.auth().signInWithEmailAndPassword(this.state.lemail,this.state.lpassword).then((result) =>{
      //Promise was successful
      thisState.setState({errorTxt:''});
      Alert.alert('GreenPoints','Successfully logged in');
      thisState.props.navigator.push({index:5, passProps:{}});
    },(error) => {
      //Promise was rejected
      // Handle Errors here.
      console.log(error.message);
      thisState.setState({errorTxt:error.message});
      })

  }
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

          <View style={[styles.itemcontainer,{flexDirection:'row', justifyContent:'center', alignItems:'center'}]}>
            <TextInput
              placeholder='Email'
              keyboardType = 'email-address'
              style={styles.textinput}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              onChangeText={(txt) => this.setState({lemail: txt})}
            />
            <View style={{ position: 'absolute', left:Dimensions.get('window').width * .69,}}>{userIcon}</View>
          </View>
          <View style={[styles.itemcontainer,{flexDirection:'row', justifyContent:'center', alignItems:'center', marginTop:10}]}>
            <TextInput
              placeholder ='Password'
              maxLength={20}
              keyboardType = 'default'
              secureTextEntry = {true}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              style={styles.textinput}
              onChangeText={(txt) => this.setState({lpassword: txt})}
            />
              <View style={{position: 'absolute', left:Dimensions.get('window').width * .69,}}>{pwIcon}</View>
          </View>
          <View style={[styles.itemcontainer,{marginTop:5}]}>
            <Text style={[styles.instructions, { color: 'rgba(177,72,72,1)'}]}>{this.state.errorTxt}</Text>
          </View>
          <View style={[styles.itemcontainer, {flexDirection:'row',marginTop:5}]}>
            <TouchableOpacity
              style={[styles.button,{flexDirection:'row',justifyContent:'center', flex:1}]}
              onPress={()=>this._handleLogin()}>
              {signInIcon}
            <Text style={styles.buttontext}> Login</Text>
            </TouchableOpacity>
            <Text style={[styles.buttontext,{flex:0.1}]}></Text>
            <TouchableOpacity
              style={[styles.button,{flexDirection:'row',justifyContent:'center', flex:1}]}
              onPress={()=> this._onPressRegister()}>
              {regIcon}
              <Text style={styles.buttontext}> Register</Text>
          </TouchableOpacity>
          </View>
          <View style={[styles.itemcontainer,{marginTop:10}]}>
            <TouchableOpacity
              style={[styles.button,{backgroundColor:'#3b5998', flexDirection:'row', justifyContent:'center'}]}
              onPress={() => this._fbAuth()}>
            {fbIcon}<Text style={styles.buttontext}>  Login with Facebook</Text>
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
const fbIcon = (<Icon name="facebook-square" size={25} color="#fff" />)
const signInIcon = (<Icon name="sign-in" size={25} color="#fff" />)
const userIcon = (<Icon.Button name="user" backgroundColor="#fff" color="#9f9f9f"/>)
const pwIcon = (<Icon.Button name="lock" backgroundColor="#fff" color="#9f9f9f"/>)
const regIcon = (<Icon style={{marginTop:3}} name="user-plus" size={20} color="#fff"/>)

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
