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
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class coupondetailscreen extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    //get current user, should not be null because we will only allow the user that have already logged in to see this page
    var user = firebase.auth().currentUser;
    //the database path based on the user's UID from Firebase's Authentication System

  }
  componentWillMount() {

  }
  shouldComponentUpdate() {
    return true;
    //this._handleGetInfo(this.itemsRef);

  }

  render() {
    return (
      <Image
        style={styles.container}
        source={require('./greenpoint_img/greenPointsBG.png')}>
          <View style={[styles.itemcontainer, {marginTop:70}]}>
            <Image style={styles.rowimage} source={{uri:this.props.cimage}}></Image>
            <View style={{flexDirection:'row',marginTop:10}}>
              <Text style={[styles.titletext,{flex:1}]}>Name:</Text>
              <Text style={{flex:2.5}}>{this.props.cname}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={[styles.titletext,{flex:1}]}>Promocode:</Text>
              <Text style={{flex:2.5}}>{this.props.cpromoCode}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={[styles.titletext,{flex:1}]}>Coupon ID:</Text>
              <Text style={{flex:2.5}}>{this.props.ckey}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={[styles.titletext,{flex:1}]}>Description:</Text>
              <Text style={{flex:2.5}}>{this.props.cdesc}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={[styles.titletext,{flex:1}]}>Status:</Text>
              <Text style={{flex:2.5}}>{this.props.cstatus}</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={[styles.titletext,{flex:1}]}>Validate Until:</Text>
              <Text style={{flex:2.5}}>{this.props.cexpire}</Text>
            </View>

          </View>

      </Image>
    );
  }

}
const userIcon = (<Icon name="user" size={20} color="#fff" />)
const pwIcon = (<Icon name="lock" size={25} color="#fff" />)
const confirmIcon = (<Icon name="check-circle-o" size={25} color="#fff" />)
const emailIcon = (<Icon name="at" size={25} color="#fff" />)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
  },
  tablecontainer: {
    flex:1,
    padding:10,
    paddingTop:65,
  },
  titletext: {
    fontSize: 15,
    fontWeight: 'bold',

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
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,.6)',
    marginTop: 20,
    width: Dimensions.get('window').width * .95,
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
  row:{
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,.6)',
    flexDirection: 'row',
    height: 120,
  },
  rowimage:{
    height:72,
    width:72,

  },
  rowtitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowdes: {
    fontSize: 15,
  }
});
