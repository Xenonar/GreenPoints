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
      dataSource: ds.cloneWithRows(['row1']),
      hasCoupon:false,
    }
    //get current user, should not be null because we will only allow the user that have already logged in to see this page
    //the database path based on the user's UID from Firebase's Authentication System

    this._handleGetInfo = this._handleGetInfo.bind(this);

    // var user = firebase.auth().currentUser;
    // api.view(user.uid).then((data)=>{
    //   //alert(JSON.stringify(data));
    //   // Loop through objects
    //   for (let i=-1; i< Object.keys(data).length; i++) {
    //     var items = Object.keys(data)[i];
    //   alert(items);
      //alert(data.cname);

  //     }
  //
  //     // console.log('We got ' + JSON.stringify(data));
  //     // alert('We got ' + JSON.stringify(data));
  //     // this.setState({dataSource: ds.cloneWithRows(data)});
  // });
  }
  componentDidMount() {
    this._handleGetInfo();
  }
  shouldComponentUpdate() {
    return true;
    //this._handleGetInfo(this.itemsRef);
  }
  _handleGetInfo(){
    var user = firebase.auth().currentUser;
    if(user != null){
        let itemsRef = firebase.database().ref("users/"+user.uid+"/coupon");
      //Get data from Firebase based on itemsRef
      	itemsRef.orderByChild('createdAt').on("value", (snap) => {
          if (snap.numChildren() > 0){
            //create new emprty array called 'items' to make an array of objects like [{ob1} , {ob2}] ....
            //where ob1 and ob2 has its own keys e.g. name, _key
            var items = [];
            //use the data that we got from Firebase which we refers as 'snap'
            //Loop through it and push the data to the 'items' array that we have created early
            snap.forEach((child) => {
              items.push({
                //----- WTF is snap ------//
                //snap will have a data like -sdWRsfa6WRqfw {cname:'kak', expires:'some date' etc} , -sdWRsfserrsdsf {cname:'sdsd' ....} bla bla
                //that random text e.g. '-sdWRsfa6WRqfw' is like an instance of a coupon which has its own information like coupon name and etc,
                //and we may have one or more coupons stored in here
                //the '-sdWRsfa6WRqfw' and '-sdWRsfserrsdsf' are a >>unique keys<< that generated by Firebase push method to ensure that
                //each data will always unique and not conflicts with other data
                //also it can be any random name, '-sdWRsfa6WRqfw' is just an example
                //----------------------------------------------------//
                //----- WTF is child ------//
                // each child will have a data structure like {cname: 'kak', expires: 'some date' etc}
                // it's just a loop that loop through 'snap' so we can access a data inside each coupon(unique key)
                // and to notice, the unique key in each loop now will refers as 'child'
                // so the following codes will access the 'child' keys and theirs value directly.
                name: child.val().cname,
                image: child.val().photoURL,
                promoCode: child.val().code,
                desc: child.val().description,
                status: child.val().status,
                expireDate: child.val().expire,
                _key: child.key,
              });
            });
            this.setState({hasCoupon: true, dataSource: this.state.dataSource.cloneWithRows(items.reverse())});
            //Just for checking
            //alert(JSON.stringify(items[0].name));
            //alert(JSON.stringify(this.state.dataSource));
          }else{
            this.setState({hasCoupon: false});
          }

        });
    }


  }

  render() {
    if(!this.state.hasCoupon){
      return (
        <Image
          style={styles.container}
          source={require('./greenpoint_img/greenPointsBG.png')}>
          <Text style={{alignSelf:'center', marginTop:65}}> No coupon</Text>

        </Image>
      );
    }else{
      return (
        <Image
          style={styles.container}
          source={require('./greenpoint_img/greenPointsBG.png')}>
          <ListView
            style={styles.tablecontainer}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <TouchableOpacity style={{marginTop:3}} onPress={()=>
                this.props.navigator.push({
                  index:9 ,
                  passProps: {
                    cpromoCode: rowData.promoCode,
                    ckey: rowData._key,
                    cname: rowData.name,
                    cimage: rowData.image,
                    cdesc: rowData.desc,
                    cstatus: rowData.status,
                    cexpire: rowData.expireDate,
                  }})}>
                <View style={styles.row}>
                  <View style={{flex:3,justifyContent:'center'}}>
                    <Image style={styles.rowimage} source={{uri: rowData.image}}/>
                  </View>
                  <View style={{flex:10, padding:10,justifyContent:'center'}}>
                    <Text style={styles.rowtitle}>{rowData.name}</Text>
                    <Text style={styles.rowdes}>{rowData.desc}</Text>
                    <Text style={styles.rowdes}>Expire: {rowData.expireDate}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }

          />

        </Image>
      );
    }
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
    paddingLeft:10,
    paddingRight:10,
    marginTop: 60,
    marginBottom: 5,
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