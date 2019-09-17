import React, { Component } from 'react';
import { Image,Text } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, View } from 'native-base';



class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        let category=this.props.product.category
        return ( 
        <Card style={{display:'flex',flexDirection:'row'}}>
            <View style={{flex:1}}>
                <Image source={{uri: this.props.product.photo}} style={{height: 150, width: 150, flex: 1}}/>
            </View>
            <View style={{flex:1,margin:1}}>
                <Text style={{flex: 1, flexWrap: 'wrap',color:'#008080'}}>
                    {category.name}
                </Text>
                <Text style={{flex: 1, flexWrap: 'wrap',fontWeight:'900',fontSize:18}}>
                    {this.props.product.name}
                </Text>
                <Text style={{flex: 1, flexWrap: 'wrap',color:'#666666'}}>
                    {this.props.product.description}...
                </Text>
                <Text style={{flex: 1, flexWrap: 'wrap',color:'orange',fontWeight:'900'}}>
                    Kshs. {this.props.product.price}
                </Text>
                {this.props.mine?
                <View style={{flex:1,marginTop:3,flexDirection:'row',justifyContent:'space-evenly'}}>
                        <Icon name='md-trash' style={{color:'#ff0000'}}/>
                        <Icon name='md-hammer' style={{color:'orange'}}/>
                </View>
                :null}
            </View>
        </Card> );
    }
}
 
export default Product;