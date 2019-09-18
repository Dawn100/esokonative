import React, { Component } from 'react';
import { StatusBar,Dimensions,AsyncStorage } from "react-native";
import { Container,Button, Header,Spinner, Content, Form, Item, Input, Label,Icon, View, Text,Toast } from 'native-base';
import * as Font from 'expo-font';

import config from '../config'



class Signup extends Component {
  static navigationOptions = () => ({
    header: null,
  });


  constructor(props){
    super(props)
    this.state={
      fontLoaded:false,
      email:'',
      password:'',
      name:'',
      confirm_pass:'',
      match:0
    }
    this.signin=this.signin.bind(this)
    this.register=this.register.bind(this)

  }

  signin(){
    this.props.navigation.navigate('Login')
  }

  register(){

    fetch(config.server+'/register/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
              name:this.state.name,
              email:this.state.email,
              password:this.state.password              
            })
        }).then(response=>{
            if (response.ok) {
            return response.json()
            } 
        }).then(async response=>{
              if (response.api_token) {
                await AsyncStorage.setItem('API_TOKEN',response.api_token)
                Toast.show({
                  text: "Registration Success!!",
                  type:'success',
                  buttonText: 'Okay',
                  duration:5000,
                  onClose:()=>{
                    this.props.navigation.navigate('List')
                  }
                })
              } else {
                Toast.show({
                  text: "Something went wrong :(",
                  type:'warning',
                  buttonText: 'Try Again',
                  duration:5000
                })
              }
               
        })
  }


  async componentDidMount(){
    await Font.loadAsync({
      Roboto_medium: require("../assets/fonts/Roboto_medium.ttf")
    });
    this.setState({fontLoaded:true})
  }
  render() {
    var confirm_color='#eeeeee'
    switch (this.state.match) {
      case 0:
        confirm_color='#eeeeee'
        break;
      case 1:
          confirm_color='#ff0000'
          break;
      case 2:
            confirm_color='#ffffff'
            break;
    
      default:
        break;
    }
    return this.state.fontLoaded?
      (<Container style={{backgroundColor:"#038C65",flex:1}}>
        <StatusBar
                        translucent={false}
                        hidden={false}
                        backgroundColor="#038C65"
                        barStyle="light-content"
                    />
        <Content style={{flex:1}}>
          <View  style={{flex:1,height:Dimensions.get('screen').height,flexDirection:'column',justifyContent:'space-evenly',marginHorizontal:50}}>
            
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#fff',fontSize:40,fontWeight:'900'}} >Register</Text>
            </View>

            <View style={{flex:3}}>
              <Form style={{flex:1,flexDirection:'column',justifyContent:'space-evenly',alignItems:'flex-start'}}>
              <Item >
                  <Input onChangeText={text=>{this.setState({name:text})}} value={this.state.name} selectionColor={'white'} textContentType='name' style={{color:'#dddddd',textAlign:'center',fontWeight:'900',fontSize:20}} placeholderTextColor="#eeeeee" placeholder="Full name"/>
                </Item>
                <Item >
                  <Input onChangeText={text=>{this.setState({email:text})}} value={this.state.email} selectionColor={'white'} textContentType='emailAddress' style={{color:'#dddddd',textAlign:'center',fontWeight:'900',fontSize:20}} placeholderTextColor="#eeeeee" placeholder="Email"/>
                </Item>
                <Item >
                  <Input onChangeText={text=>{this.setState({password:text})}} value={this.state.password} selectionColor={'white'} textContentType='password' secureTextEntry={true}  style={{color:'#dddddd',textAlign:'center',fontWeight:'900',fontSize:20}} placeholderTextColor="#eeeeee" placeholder="Password"/>
                </Item>
                <Item>
                  <Input  
                  
                  onChangeText={text=>{
                    if (text!=this.state.password) {
                      this.setState({match:1,confirm_pass:text})
                    } else {
                      this.setState({match:2,confirm_pass:text})
                    }
                  }
                }
                value={this.state.confirm_pass}
                selectionColor={confirm_color} 
                textContentType='newPassword' 
                secureTextEntry={true}  
                style={{color:confirm_color,textAlign:'center',fontWeight:'900',fontSize:20}} 
                placeholderTextColor={confirm_color} 
                placeholder="Retype Password"/>
                </Item>
              </Form>
            </View>

            <View style={{flex:2,flexDirection:'row',justifyContent:'space-evenly',alignItems:'flex-start'}}>
            <Button
            bordered
            rounded
            style={{
              borderColor: "#dddddd",
              width: 150,
              flex:1,
              backgroundColor:'#00808030'
            }}
            onPress={this.signin}
          >
            <Text style={{ color: "#dddddd", fontSize: 15,alignItems:'center',justifyContent:'center' }}>
              SignIn
            </Text>
          </Button>
          <Button
            bordered
            rounded
            style={{
              borderColor: "#dddddd",
              width: 150,
              flex:1,
              marginLeft:10,
              backgroundColor:'#dddddd'
            }}
            onPress={this.register}
          >
            <Text style={{ color: "#038C65", fontSize: 15,alignItems:'center',justifyContent:'center' }}>
              Register
            </Text>
          </Button>

            </View>
          </View>
          
        </Content>
      </Container>):<Container style={{backgroundColor:'#038C65'}}><Spinner color='#dddddd' /></Container>;
  }
}
 
export default Signup;