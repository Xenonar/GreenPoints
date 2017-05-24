/*
Requirement:
-npm install react-native-qrcode --save
-voucher_codes.js
 */
import QRCode from 'react-native-qrcode';
import voucher_codes from './voucher_codes.js';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
} from 'react-native';
import * as firebase from 'firebase';

export default class gencoupon extends Component {
  constructor(props){
    super(props);
    this.state = {
      Code: ["000000"],
      count: 0,
      auth: "",
      click: 0,
      points: 10,
      modalVisible: false,
      isNext: false
    }
    this.sendNo = this.sendNo.bind(this);
    this.generateCode = this.generateCode.bind(this);
    this.addCode = this.addCode.bind(this);
    this._handleButton = this._handleButton.bind(this);
  }
  sendNo(number){
    this.setState({count: number}); //for limited coupon in the future
    this.generateCode(); // generate code

  }
  _handleButton(){
    alert(this.state.Code);
  }
  componentWillMount(){
    this.setState({modalVisible: false});
  }
  componentDidMount(){
    //this.setState({modalVisible: this.props.modalVisible});
  }
  generateCode(){
    //from voucher_codes.js run function generate to get code No of char = length
    //count for case that want to generate many code at the same time.
    var basicCodes = voucher_codes.generate({
        length: 6,
        count: 1
    });
    //set data in to state
    this.setState({Code:basicCodes, click: this.state.click+1})
  }
  addCode(){
    //add code+points into firebase
    var user = firebase.auth().currentUser;
    let codeArr = this.state.Code;
    if (user != null) {
      var db = firebase.database().ref('codes/');
      codeArr.forEach((codechild) =>{
        if(codechild != "000000"){
          db.child(codechild).set({
            points: this.state.points,
            status: 'available',
            generatedBy: user.uid,
          });
        }
      });

    }
  }

  render() {
    //with StartNext variable so we can set "Start" and "Next" button
    // if first time code will be "000000" ,show "Start button"
    // else show Code and show "Next button"
    let StartNext;
    if(this.state.isNext){
    StartNext = (<TouchableOpacity style={styles.button}
      onPress={()=>{this.sendNo(1)}}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>)}
    else
    { StartNext = (<TouchableOpacity style={styles.button}
      onPress={()=>{this.sendNo(1), this.setState({isNext:true})}}>
      <Text style={styles.buttonText}>Generate</Text>
    </TouchableOpacity>)}

    return (
      <View style={styles.container}>
        <Modal animationType={"slide"} transparent={true}
           visible={this.state.modalVisible}
           onRequestClose={() => {alert("Set the points to " + this.state.points)}}
        >
           <View style={styles.modal}>
          <TouchableOpacity onPress={()=>{
              this.setState({points: 10 }),
              this.setState({modalVisible:false})
            }
          }>
          <Text style={styles.labelText}>
            10points
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
              this.setState({points: 20 }),
              this.setState({modalVisible:false})
            }
          }>
          <Text style={styles.labelText}>
            20points
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
              this.setState({points: 30 }),
              this.setState({modalVisible:false})
            }
          }>
          <Text style={styles.labelText}>
            30points
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
              this.setState({points: 40 }),
              this.setState({modalVisible:false})
            }
          }>
          <Text style={styles.labelText}>
            40points
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
              this.setState({points: 50 }),
              this.setState({modalVisible:false})
            }
          }>
          <Text style={styles.labelText}>
            50points
          </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
              this.setState({points: 100 }),
              this.setState({modalVisible:false})
            }
          }>
          <Text style={styles.labelText}>
            100points
          </Text>
          </TouchableOpacity>
          </View>
        </Modal>

        <Text style={styles.codeShow}>
          {this.state.Code[0]}
        </Text>
        <QRCode
          value={this.state.Code[0]}
          size={200}
          bgColor='green'
          fgColor='white'
          />
        <View>
          {StartNext}
          <TouchableOpacity style={styles.button}
            onPress={()=>this.addCode()}>
            <Text style={styles.buttonText}>Set</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={()=>this.setState({modalVisible:true})}>
            <Text style={styles.buttonText}>Change Points</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>
          {this.state.points+"Points/key"}
        </Text>
      </View>

    );

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
      height: 40,
      width: 100,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      borderRadius: 5,
      padding: 5,
  },
  codeShow:{
    color:'darkgreen',
    fontSize: 30
  },
  button:{
    marginTop: 10,
    height: 50,
    width: Dimensions.get('window').width * .5,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray'
  },
  buttonText:{
    fontSize:25,
    color: "black"
  },
  infoText:{
    fontSize:35,
    color: "green"
  },
  modal:{
    height: 280,
    width: 300,
    marginTop: 150,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'

  },
  labelText: {
      height: 35,
      width: 150,
      fontSize: 20,
      margin: 5,
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: 'lightgray'
  },

});
