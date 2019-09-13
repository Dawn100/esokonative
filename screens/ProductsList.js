import React, { Component } from 'react';
import { StatusBar,View,Image } from "react-native";
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
    ListItem,
    Tab, Tabs,ScrollableTab
  } from "native-base";
import * as Font from 'expo-font';
import MyProducts from './MyProducts';
import Constants from 'expo-constants';
import Product from './Product';

class ProductsList extends Component {
    static navigationOptions = () => ({
        header: null
      });
    constructor(props) {
        super(props);
        this.state = { 
            products:[]
         }
         this.gotoNew = this.gotoNew.bind(this);
    }

    gotoNew(){
        const { navigate } = this.props.navigation;
        navigate('Add')
    }
    async componentWillMount(){
        let api_token="zDlrQ3x4QLVxrK0xUseqVhzMmJQ8iEzKikdUvd2WHYQ4LXSx14nQWXsde9O9"
       await fetch("http://192.168.43.118:8000/api/products/?api_token="+api_token,{
            method:'GET',
        }).then(response=>response.json()).then(response=>{
            this.setState({
                products:response
            })
        })
    }
    async componentDidMount() {
        await Font.loadAsync({
          Roboto_medium: require("../assets/fonts/Roboto_medium.ttf")
        });
    
        this.setState({ fontLoaded: true });
      }
    render() {        
        return this.state.fontLoaded ? (
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
          {this.state.products.map(product=><Product product={product} key={product.id}/>)}
          </Tab>
          <Tab activeTabStyle={{backgroundColor:"#038C65"}} tabStyle={{backgroundColor:"#038C65"}} heading="My Products">
          <MyProducts/>
          </Tab>
        </Tabs>
      </Container>
        ):null;
    }
}
 
export default ProductsList;