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
  ListView,
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from './api.js';

export default class usercouponlistscreen extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Account','Get Coupon', 'Redeem Code' , 'Scan QR (coming soon)']),
    }
    //get current user, should not be null because we will only allow the user that have already logged in to see this page
    this._changeScene = this._changeScene.bind(this);
  }
  componentWillMount() {
  }
  shouldComponentUpdate() {
    return true;
    //this._handleGetInfo(this.itemsRef);
  }
  _changeScene(sceneName){
    if(sceneName == 'Account'){
      this.props.navigator.push({index:1, passProps:{}});
    }else if (sceneName == 'Get Coupon'){
      this.props.navigator.push({index:7, passProps:{}});
    }else if (sceneName == 'Redeem Code'){
      this.props.navigator.push({index:4, passProps:{}});
    }else if (sceneName == 'Scan QR (coming soon)'){
      this.props.navigator.push({index:5, passProps:{}});
    }
   }
  render() {
    return (
      <Image
        style={styles.container}
        source={require('./greenpoint_img/greenPointsBG.png')}>
        <ListView
          style={styles.tablecontainer}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity style={{marginTop:3}} onPress={()=> this._changeScene(rowData)}>
              <View style={styles.row}>

                <View style={{flex:10, padding:10,justifyContent:'center'}}>
                  <Text style={styles.rowtitle}>{rowData}</Text>
                </View>
              </View>
            </TouchableOpacity>

          }

        />

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
    width: null,
    height: null,
  },
  tablecontainer: {
    flex:1,
    padding:10,
    paddingTop:65,
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
  row:{
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,.6)',
    flexDirection: 'row',
    height: 72,
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
