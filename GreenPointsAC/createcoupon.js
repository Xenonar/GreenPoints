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

export default class createcouponscreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorTxt: '',
      errorBG: 'rgba(255,255,255,0)',
      name: '',
      code: '',
      desc: '',
      exp: '',
      photoURL: '',
      price: 0,
    }
    this._handleDevCheat = this._handleDevCheat.bind(this);

  }
  _handleDevCheat(){
    var user = firebase.auth().currentUser;
    if (user != null) {
      var dbserver = firebase.database().ref('couponTable/');
      if(this.state.name == '' || this.state.code =='' || this.state.desc =='' || this.state.exp =='' || this.state.photoURL ==''){
        this.setState({errorTxt:'Please make sure you have filled all information!', errorBG: 'rgba(228,78,61,1)'});
      }else if (this.state.price < 10){
        this.setState({errorTxt:'Please make sure the point is higher than 10!', errorBG: 'rgba(228,78,61,1)'});
      }else{
        this.setState({errorTxt:' ', errorBG: 'rgba(228,78,61,0)'});
        dbserver.push({
          cname:this.state.name,
          code: this.state.code,
          description: this.state.desc,
          expire: this.state.exp,
          photoURL: this.state.photoURL,
          status: 'not used',
          owner: user.uid,
          price: parseInt(this.state.price),
          createdAt:firebase.database.ServerValue.TIMESTAMP,
        });
        this.props.navigator.push({index:1, passProps:{}});
      }
    }
  }

  render() {
    return (
      <Image
        style={styles.container}
        source={require('./greenpoint_img/greenPointsBG.png')}>
        <KeyboardSpacer />
        <View style={[styles.itemcontainer,{marginTop:10}]}>
          <Text style={styles.titletext}> Please insert an information:</Text>
        </View>
        <View style={[styles.itemcontainer,{marginTop:5}]}>
          <TextInput
            placeholder='Coupon Name'
            keyboardType = 'default'
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({name:txt})}
          />
        </View>
        <View style={[styles.itemcontainer,{marginTop:5}]}>
          <TextInput
            placeholder='Promotion Code'
            maxLength={20}
            keyboardType = 'default'
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({code:txt})}
          />

        </View>
        <View style={[styles.itemcontainer,{marginTop:5}]}>
          <TextInput
            placeholder='Coupon Description'
            maxLength={100}
            keyboardType = 'default'
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({desc:txt})}
          />
        </View>
        <View style={[styles.itemcontainer,{marginTop:5}]}>
          <TextInput
            placeholder='Expire Date'
            maxLength={20}
            keyboardType = 'default'
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({exp:txt})}
          />
        </View>
        <View style={[styles.itemcontainer,{marginTop:5}]}>
          <TextInput
            placeholder='Photo URL'
            maxLength={20}
            keyboardType = 'default'
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({photoURL:txt})}
          />
        </View>
        <View style={[styles.itemcontainer,{marginTop:5}]}>
          <TextInput
            placeholder='Points to use'
            maxLength={20}
            keyboardType = 'numeric'
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            style={styles.textinput}
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            onChangeText={(txt) => this.setState({price:txt})}
          />
        </View>

        <View style={styles.itemcontainer}>
          <TouchableOpacity
            style={[styles.button,{flexDirection:'row',justifyContent:'center'}]}
            onPress={()=>this._handleDevCheat()}>
            {confirmIcon}<Text style={styles.buttontext}> Create Coupon</Text>
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
