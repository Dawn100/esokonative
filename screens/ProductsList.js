import React, { Component } from 'react';
import { StatusBar,View,Image,ScrollView,AsyncStorage,BackHandler } from "react-native";
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Fab,
    List,
    ListItem,Spinner,
    Tab, Tabs,ScrollableTab,Root,Toast
  } from "native-base";
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import Product from './Product';
import config from "../config";

class ProductsList extends Component {
    static navigationOptions = () => ({
        header: null,
      });
     constructor(props) {
        super(props);
        this.state = { 
            products:[],
            myproducts:[]
         }
         this.add = this.add.bind(this);
         this.delete = this.delete.bind(this);
         this.edit = this.edit.bind(this);
         this.details = this.details.bind(this);
         this.remove=this.remove.bind(this);

    }

    async remove(id){
        var api_token=await AsyncStorage.getItem('API_TOKEN')
        await fetch(config.server+"/products/"+id+"?api_token="+api_token,
        {
            method:'DELETE'
        }).then(response=>{
            if(response.ok){
                return response.json()
            }
        }).then(response=>{
            if (response && response.message==="deleted") {
                this.fetchProducts();       
            }
        })
    }

    async delete(id){
    
        Toast.show({
            text: 'Are you sure!!',
            type:'danger',
            buttonText: 'Okay',
            duration:5000,
            onClose:()=>{
                this.remove(id);
            }
          }) 
        
    }
    edit(id){
        const { navigate } = this.props.navigation;
        navigate('Edit',{id:id})
    }
    details(id){
        const { navigate } = this.props.navigation;
        navigate('Detail',{id:id})
    }

    add(){
        const { navigate } = this.props.navigation;
        navigate('Add')
    }

    async fetchProducts(){
        var api_token=await AsyncStorage.getItem('API_TOKEN')
        //Fetch all products
        await fetch(config.server+"/products/?api_token="+api_token,{
            method:'GET',
        }).then(response=>response.json()).then(response=>{
            this.setState({
                products:response
            })
        })

        //Fetch only my products
        await fetch(config.server+"/user/products/?api_token="+api_token,{
              method:'GET',
          }).then(response=>response.json()).then(response=>{
              this.setState({
                  myproducts:response
              })
          })


        //Load the font
        await Font.loadAsync({
            Roboto_medium: require("../assets/fonts/Roboto_medium.ttf")
          });
        this.setState({ fontLoaded: true });

    }

    componentDidMount() {
        this.fetchProducts();
        // BackHandler.addEventListener('hardwareBackPress', function() {return true})
    }
    
    render() {        
        return this.state.fontLoaded ? (<Root>
            <Container>
                <Header style={{backgroundColor:"#038C65"}} hasTabs>
                    <StatusBar
                        translucent={false}
                        hidden={false}
                        backgroundColor="#038C65"
                        barStyle="light-content"
                    />
                    <Left style={{ flex: 1 }} />
                    <Body style={{ flex: 1 }}>
                        <Title style={{ color: "#fff" }}>Esoko Products</Title>
                    </Body>
                    <Right style={{ flex: 1 }} />
                </Header>
                <Tabs renderTabBar={()=> <ScrollableTab  style={{backgroundColor:"#038C65"}} />}>
                <Tab activeTabStyle={{backgroundColor:"#038C65"}} tabStyle={{backgroundColor:"#038C65"}} heading="All Products">
                    <ScrollView style={{backgroundColor:"#eeeeee",flex:1}}>
                            {this.state.products.map(product=><Product details={this.details} mine={false} product={product} key={product.id}/>)}
                    </ScrollView>
                </Tab>
                <Tab activeTabStyle={{backgroundColor:"#038C65"}} tabStyle={{backgroundColor:"#038C65"}} heading="My Products">
                <ScrollView style={{backgroundColor:"#eeeeee",flex:1}}>
                            {this.state.myproducts.map(product=><Product details={this.details} delete={this.delete} edit={this.edit} product={product} mine={true} key={product.id}/>)}
                <View style={{flex:1,height:100}}/>
                </ScrollView>
                <Fab position='bottomRight' style={{backgroundColor:'#038C65'}} onPress={this.add} >
                    <Icon name='md-add'/>
                </Fab>
                </Tab>
                </Tabs>
      </Container></Root>
        ):<Container style={{backgroundColor:'#038C65'}}><Spinner color='#dddddd' /></Container>;
    }
}
 
export default ProductsList;