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
  Alert,
  Keyboard,
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class profilescreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      point: '0',
      coupon: '0',
      usrType: '',
    }

    this._handleUpdate = this._handleUpdate.bind(this);
  }
  componentWillMount(){
    this._handleUpdate();
  }
  _handleUpdate(){
  	var user = firebase.auth().currentUser;
    if (user != null) {
      var email = user.email;
    	var name = user.displayName;
    	var db = firebase.database();
    	var refPointsStr = "users/"+user.uid+"/points";
    	var refCouponStr = "users/"+user.uid+"/coupon";
    	var refPoints = db.ref(refPointsStr);
    	var refCoupon = db.ref(refCouponStr);
      var usrType = db.ref("users/"+user.uid+"/usertype");
    	var self = this;
    	refPoints.on("value", function(snapshot) {
    		self.setState({point:snapshot.val()});
    	}, function (errorObject) {
    	   console.log("Failed to read data: " + errorObject.code);
    	});
    	refCoupon.on("value", function(snapshot) {
    		self.setState({coupon:snapshot.numChildren()});
    	}, function (errorObject) {
    	   console.log("Failed to read data: " + errorObject.code);
    	});
      usrType.on("value", function(snapshot) {
    		self.setState({usrType:snapshot.val()});
    	}, function (errorObject) {
    	   console.log("Failed to read data: " + errorObject.code);
    	});
    	this.setState({ email: email });
    	this.setState({ name: name });

    }

  }
  _handleSave(){
  	var user = firebase.auth().currentUser;
  	var self = this;
  	user.updateProfile({
  		displayName: self.state.name
  	}).then(function() {
  		// Update successful.
  		Alert.alert('Info','Successfully saved.');
  	}, function(error) {
  		// An error happened.
  		Alert.alert('Info','Failed to save.');
  	});
  }
  _handleCreateCoupon(){
    this.props.navigator.push({index:2, passProps:{}});
  }
  _handleLogout(){
    let thisState = this;
    firebase.auth().signOut().then(function() {
    	// Sign-out successful.
      Alert.alert('GreenPoints','Successfully logged out');
      thisState.props.navigator.push({index:0, passProps:{}});
      Keyboard.dismiss();
    	}, function(error) {
    	// An error happened.
    	});
  }
  render() {
    if(this.state.usrType == 'Admin'){
      return (
        <Image
          style={styles.container}
          source={require('./greenpoint_img/greenPointsBG.png')}>
          <View style={[styles.itemcontainer,{flexDirection:'row',marginTop:10}]}>
          <KeyboardSpacer />
            <Text style={styles.titletext}> Name:</Text>
          </View>
  		<View style={[styles.itemcontainer,{marginTop:0}]}>
            <TextInput
              value={this.state.name}
  			      onChangeText={(name) => this.setState({name})}
              keyboardType = 'default'
              underlineColorAndroid='rgba(0,0,0,0)'
              editable = {false}
              autoCorrect={false}
              style={styles.textinput}
            />
          </View>

  		<View style={[styles.itemcontainer,{flexDirection:'row',marginTop:10}]}>
            <Text style={styles.titletext}> Email:</Text>
          </View>
  		<View style={[styles.itemcontainer,{marginTop:0}]}>
            <TextInput
              value={this.state.email}
  			 onChangeText={(email) => this.setState({email})}
              keyboardType = 'email-address'
              editable = {false}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              style={styles.textinput}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
            />
          </View>

  		<View style={[styles.itemcontainer,{flexDirection:'row',marginTop:10}]}>
            <Text style={styles.displaytext}> Current Point: </Text>
  		  <Text style={styles.displaytext}>{this.state.point}</Text>
          </View>

  		<View style={[styles.itemcontainer,{flexDirection:'row',marginTop:5}]}>
            <Text style={styles.displaytext}> Coupon Owned: </Text>
  		  <Text style={styles.displaytext}>{this.state.coupon}</Text>
          </View>

  		<View style={[styles.itemcontainer,{marginTop:15}]}>
            <TouchableOpacity
              style={[styles.button,{flexDirection:'row',justifyContent:'center'}]}
  			      onPress={()=>this.props.navigator.push({index:6 , passProps:{modalVisible: true}})}
            >
              {refreshIcon}
              <Text style={styles.buttontext}> GENERATE CODE</Text>
            </TouchableOpacity>
  		</View>
      <View style={[styles.itemcontainer,{marginTop:10}]}>
        <TouchableOpacity
          style={[styles.button,{flexDirection:'row',justifyContent:'center'}]}
          onPress={()=>this._handleCreateCoupon()}>
          {confirmIcon}<Text style={styles.buttontext}> CREATE COUPON</Text>
        </TouchableOpacity>

      </View>
      <View style={[styles.itemcontainer,{marginTop:10}]}>
            <TouchableOpacity
              style={[styles.button,{flexDirection:'row',justifyContent:'center'}]}
  			      onPress={()=>this.props.navigator.push({index:8, passProps:{}})}
            >
              {couListIcon}
              <Text style={styles.buttontext}> MY COUPON LIST</Text>
            </TouchableOpacity>
  		</View>

      <View style={[styles.itemcontainer,{marginTop:10}]}>
            <TouchableOpacity
              style={[styles.button,{flexDirection:'row',justifyContent:'center',backgroundColor:'rgba(205,92,92,1)'}]}
  			      onPress={()=>this._handleLogout()}
            >
              {logoutIcon}<Text style={styles.buttontext}> LOGOUT</Text>
            </TouchableOpacity>
  		</View>
      <View style={[styles.itemcontainer,{marginTop:20}]}>
            <Text style={styles.instructions}> User Type: {this.state.usrType}</Text>
  		</View>
        </Image>
      );
    }else{
      return (
        <Image
          style={styles.container}
          source={require('./greenpoint_img/greenPointsBG.png')}>
          <KeyboardSpacer />
          <View style={[styles.itemcontainer,{flexDirection:'row',marginTop:10}]}>
            <Text style={styles.titletext}> Name:</Text>
          </View>
  		<View style={[styles.itemcontainer,{marginTop:0}]}>
            <TextInput
              value={this.state.name}
  			onChangeText={(name) => this.setState({name})}
              keyboardType = 'default'
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              style={styles.textinput}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
            />
          </View>

  		<View style={[styles.itemcontainer,{flexDirection:'row',marginTop:10}]}>
            <Text style={styles.titletext}> Email:</Text>
          </View>
  		<View style={[styles.itemcontainer,{marginTop:0}]}>
            <TextInput
              value={this.state.email}
  			 onChangeText={(email) => this.setState({email})}
              keyboardType = 'email-address'
              editable = {false}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              style={styles.textinput}
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
            />
          </View>

  		<View style={[styles.itemcontainer,{flexDirection:'row',marginTop:10}]}>
            <Text style={styles.displaytext}> Current Point: </Text>
  		  <Text style={styles.displaytext}>{this.state.point}</Text>
          </View>

  		<View style={[styles.itemcontainer,{flexDirection:'row',marginTop:5}]}>
            <Text style={styles.displaytext}> Coupon Owned: </Text>
  		  <Text style={styles.displaytext}>{this.state.coupon}</Text>
          </View>

      <View style={[styles.itemcontainer,{marginTop:15}]}>
            <TouchableOpacity
              style={[styles.button,{flexDirection:'row',justifyContent:'center'}]}
  			      onPress={()=>this.props.navigator.push({index:8, passProps:{}})}
            >
              {couListIcon}
              <Text style={styles.buttontext}> MY COUPON LIST</Text>
            </TouchableOpacity>
  		</View>
  		<View style={[styles.itemcontainer,{marginTop:10}]}>
            <TouchableOpacity
              style={[styles.button,{flexDirection:'row',justifyContent:'center'}]}
  			      onPress={()=>this._handleSave()}
            >
              {confirmIcon}<Text style={styles.buttontext}> SAVE</Text>
            </TouchableOpacity>
  		</View>
      <View style={[styles.itemcontainer,{marginTop:10}]}>
            <TouchableOpacity
              style={[styles.button,{flexDirection:'row',justifyContent:'center',backgroundColor:'rgba(205,92,92,1)'}]}
  			      onPress={()=>this._handleLogout()}
            >
              {logoutIcon}<Text style={styles.buttontext}> LOGOUT</Text>
            </TouchableOpacity>
  		</View>
      <View style={[styles.itemcontainer,{marginTop:40}]}>
            <Text style={styles.instructions}> User Type: {this.state.usrType}</Text>
  		</View>
        </Image>
      );
    }
  }

}
const userIcon = (<Icon name="user" size={20} color="#fff" />)
const pwIcon = (<Icon name="lock" size={25} color="#fff" />)
const confirmIcon = (<Icon style={{marginTop:2}} name="check-circle-o" size={23} color="#fff" />)
const emailIcon = (<Icon name="at" size={25} color="#fff" />)
const logoutIcon = (<Icon name="sign-out" size={25} color="#fff" />)
const refreshIcon = (<Icon style={{marginTop:3}} name="refresh" size={20} color="#fff" />)
const couListIcon = (<Icon style={{marginTop:4}} name="list-alt" size={20} color="#fff" />)
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
  displaytext: {
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'grey',
    textShadowOffset: {width: 2.5, height: 2.5},
    color: 'white',
	textAlign: 'right',
  },
  instructions: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
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
