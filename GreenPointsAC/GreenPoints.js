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
  Navigator,
  Dimensions,
  Keyboard,
} from 'react-native';
import LoginScreen from './login.js';
import RegisterScreen from './register.js';
import ProfileScreen from './profile.js';
import MainMenuScreen from './mainmenu.js';
import UserCouponListScreen from './usercplist.js';
import CouponDetailScreen from './cpdetail.js';
import GenerateCouponScreen from './generateCode.js';
import RedeemCodeScreen from './redeemcode.js';
import GetCouponScreen from './getcoupon.js';
import CreateCouponScreen from './createcoupon.js';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';


var config = {
  apiKey: "AIzaSyDqSbcE_EcD5qvOvTxjooZh2KeP1Kx7Z2U",
  authDomain: "greenpoints-c1411.firebaseapp.com",
  databaseURL: "https://greenpoints-c1411.firebaseio.com",
  projectId: "greenpoints-c1411",
  storageBucket: "greenpoints-c1411.appspot.com",
  messagingSenderId: "50265269986"
};
firebase.initializeApp(config);

const routes = [
  { title: 'Login', index:0 },
  { title: 'Account', index:1 },
  { title: 'Create Coupon', index:2 },
  { title: 'Register', index:3 },
  { title: 'Redeem Code', index:4 },
  { title: 'GreenPoints', index:5 },
  { title: 'Generate Code', index:6 },
  { title: 'Get Coupon', index:7 },
  { title: 'My Coupon List', index:8 },
  { title: 'Coupon Detail', index:9 },


];
let navTitleLeftMargin = Navigator.NavigationBar.Styles.Stages.Left.Title.marginLeft || 0;
export default class MainScreen extends Component {
  constructor(props){
    super(props);
    this.database = firebase.database();
    this.state = {
      initRoute:0,
      receivedData:false
    }
  }
  componentWillMount(){
    var thisState = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        thisState.setState({initRoute:5 , receivedData:true});
      } else {
        // No user is signed in.
        thisState.setState({initRoute:0 , receivedData:true});
      }
    });

  }
  render() {
    if(this.state.receivedData != true){
      return (null);
    }else{
      return (
        <View style={styles.container}>
          <Navigator
            initialRoute = {routes[this.state.initRoute]}
            initialRouteStack = {routes}
            renderScene = {(route, navigator) =>
              {
                switch (route.index) {
                  case 0: return (<LoginScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></LoginScreen>);
                  case 3: return (<RegisterScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></RegisterScreen>);
                  case 1: return (<ProfileScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></ProfileScreen>);
                  case 5: return (<MainMenuScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></MainMenuScreen>);
                  case 8: return (<UserCouponListScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></UserCouponListScreen>);
                  case 9: return (<CouponDetailScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></CouponDetailScreen>);
                  case 6: return (<GenerateCouponScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></GenerateCouponScreen>);
                  case 4: return (<RedeemCodeScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></RedeemCodeScreen>);
                  case 7: return (<GetCouponScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></GetCouponScreen>);
                  case 2: return (<CreateCouponScreen {...route.passProps} navigator={navigator} route={routes[route.index]}></CreateCouponScreen>);
                }
              }

            }
            configureScene={
              (route, routeStack) => Navigator.SceneConfigs.FadeAndroid
            }
            navigationBar={
              <Navigator.NavigationBar
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) =>
                  {
                    if (route.index == 0){
                      return null;
                    }if (route.index == 1){
                      return (<TouchableOpacity
                          onPress={() => navigator.popToRoute(routes[5])}
                          ><View style={styles.navigationBarIcon}>
                            {menubar}
                          </View></TouchableOpacity>);
                    }if (route.index == 5){
                      return null;
                    }if (route.index == 3){
                      return (<TouchableOpacity
                          onPress={() => navigator.popToRoute(routes[0])}
                          ><View>
                            <Text style={styles.navigationBarText}>Back</Text>
                          </View></TouchableOpacity>);
                    }else{
                      return (<TouchableOpacity
                        onPress={() => navigator.pop()}
                      ><Text style={styles.navigationBarText}>Back</Text></TouchableOpacity>);
                    }
                  },
                  RightButton: (route, navigator, index, navState) =>
                  { return null; },
                  Title: (route, navigator, index, navState) =>
                  {
                    return (<Text style={styles.navigationBarTitleText}>{routes[route.index].title}</Text>);
                  },
                }}
                style={[styles.navigationBar,{overflow: 'visible'}]}
              />
            }
          />
        </View>
      );
    }

  }

}
const menubar = (<Icon name="bars" size={25} color="#fff" />)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',

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
    alignItems: 'center',
    resizeMode: 'cover',
    width: Dimensions.get('window').width * .8,
    height: 75,
  },
  navigationBar: {
    justifyContent: 'center',
    backgroundColor:'rgba(44,125,73,1)',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1.0,

  },
  navigationBarText: {
    color: 'white',
    marginLeft: 10,
    marginTop: 15,
    fontSize: 20,
  },
  navigationBarIcon: {
    marginLeft: 10,
    marginTop: 15,
  },
  navigationBarTitleText: {
    marginTop: 10,
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
    marginRight: navTitleLeftMargin,
  },
});

AppRegistry.registerComponent('GreenPointsAC', () => MainScreen);
