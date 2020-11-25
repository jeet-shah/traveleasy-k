import React from 'react';
import {styles} from '../component/Styles';
import { Text, View, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Card } from 'react-native-elements';

export default class Cart extends React.Component{

    constructor(){
        super()
        this.state={
            requestedItemsofPants:[],
            PantName:'',
            PantQuantity:'',
            PantSize:"",
            PantRate:0,
            PantPrice:0,
            requestedItemsofShirt:[],
            requestedItemsofWatch:[],
            requestedItemsofTie:[],
            requestedItemsofSport:[],
            requestedItemsofFormal:[],
            userID:firebase.auth().currentUser.email,
                tableHead: ['Items', 'Quantity', 'Rate', 'Price'],
                tableData: [
                  ['Shirt', '0', '0', '0'],
                  ['Pant', '0', '0', '0'],
                  ['Watch', '0', '0', '0'],
                  ['Tie', '0', '0', '0'],
                  ['Sport Shoes','0','0','0'],
                  ['Formal Shoes','0','0','0']
                ]
        }
    }

    getrequesteditemPant = async() => {
        const citiesRef = db.collection('Cart').doc(this.state.userID).collection('Pant').where("userID","==",this.state.userID);
        const snapshot = await citiesRef.get();
        snapshot.forEach(doc => {
            this.setState({
                PantName:doc.data().PantName,
                PantQuantity:doc.data().PantQuantity,
                PantSize:doc.data().PantSize,
                PantRate:doc.data().Rate,
            })
            this.setState({
                PantPrice:this.state.PantQuantity * this.state.PantRate
            })
        });
    }

    getrequesteditemShirt = () => {
        db.collection('Cart').doc(this.state.userID).collection('Shirts').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofShirt:requestedItems
            })
        })
    }

    getrequesteditemWatch = () => {
        db.collection('Cart').doc(this.state.userID).collection('Watch').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofWatch:requestedItems
            })
        })
    }

    getrequesteditemTie = () => {
        db.collection('Cart').doc(this.state.userID).collection('Tie').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofTie:requestedItems
            })
        })
    }

    getrequesteditemSport = () => {
        db.collection('Cart').doc(this.state.userID).collection('Sport').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofSport:requestedItems
            })
        })
    }

    getrequesteditemFormal = () => {
        db.collection('Cart').doc(this.state.userID).collection('Formal').where("userID","==",this.state.userID)
        .onSnapshot((snapshot)=>{
            var requestedItems = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                requestedItemsofFormal:requestedItems
            })
        })
    }

    componentDidMount(){
        this.getrequesteditemPant()
        this.getrequesteditemFormal()
        this.getrequesteditemShirt()
        this.getrequesteditemSport()
        this.getrequesteditemTie()
        this.getrequesteditemWatch()
    }

    render(){
        return(
            <View style={styles.container}>
                <Card>
                    <Text style={{fontWeight:'bold'}}> Pants:{this.state.PantName} </Text>
                    <Text style={{fontWeight:'bold'}}> Size:{this.state.PantSize} </Text>
                    <Text style={{fontWeight:'bold'}}> Quantity:{this.state.PantQuantity} </Text>
                    <Text style={{fontWeight:'bold'}}> Rate:{this.state.PantRate} </Text>
                    <Text style={{fontWeight:'bold'}}> Price: {this.state.PantPrice} </Text>
                </Card>
            </View>
        )
    }
}