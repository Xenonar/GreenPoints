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
      inputCode: '',
      errorTxt: '',
      errorBG: 'rgba(255,255,255,0)',
    }
    this._handleRedeem = this._handleRedeem.bind(this);
  }
  _handleRedeem(){
    if(this.state.inputCode == ""){ //if input is empty string we popup error
      this.setState({errorBG: 'rgba(228,78,61,1)', errorTxt: 'Please make sure you have entered the correct code'});
    }else if(this.state.inputCode.length < 6){ //if input is less than 6 characters we return error
      this.setState({errorBG: 'rgba(228,78,61,1)', errorTxt: 'Please make sure you have entered the correct code'});
    }else{
      var db = firebase.database().ref('codes/');
      this.setState({errorBG: 'rgba(255,255,255,0)', errorTxt: ''}); //clear error
      let thisState = this;
      db.once('value', function(snap){
        if(snap.hasChild(thisState.state.inputCode)){ //checks codes in Firebase database if it has any child that has exactly the same code as the inputCode
          var pointsToAdd = snap.child(thisState.state.inputCode).val().points; //ref directly to the points value << this will return int like 0 , 10 , etc
          var status = snap.child(thisState.state.inputCode).val().status; //ref directly to the status value << this will return string e.g. available, already used and etc
          var refStatus = firebase.database().ref("codes/"+thisState.state.inputCode+"/status"); //ref to the code's status key in Firebase e.g. codes/5Et4cX/status
          if(status == 'available'){ // check if it is available so we can redeem it
            var user = firebase.auth().currentUser;
            var refPoints = firebase.database().ref("users/"+user.uid+"/points"); // the same idea like refStatus
            refPoints.transaction(function(currentPoints){
              return currentPoints + pointsToAdd;
            });
            refStatus.transaction(function(currentStatus){
              return currentStatus = 'already used';
            });
            Alert.alert('Success!', pointsToAdd + ' points added to your account');
          }else{
            thisState.setState({errorBG: 'rgba(228,78,61,1)', errorTxt: 'This code is not available, it might already redeemed by other users or expired'});
          }


        }else{
          this.setState({errorBG: 'rgba(228,78,61,1)', errorTxt: 'Please make sure you have entered the correct code'});
        }
      },(error) =>{
        alert('Error');
      });
    }
  }
  render() {
    return (
      <Image
        style={styles.container}
        source={require('./greenpoint_img/greenPointsBG.png')}>
        <KeyboardSpacer />
        <View style={[styles.itemcontainer,{marginTop:0}]}>
          <TextInput
            placeholder='Enter code'
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({inputCode:txt})}
          />
        </View>
        <View style={[styles.itemcontainer,{marginTop:10}]}>
              <TouchableOpacity
                style={[styles.button,{flexDirection:'row',justifyContent:'center'}]}
    			      onPress={()=>this._handleRedeem()}
              >
                {confirmIcon}<Text style={styles.buttontext}> REDEEM</Text>
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
