import React, { Component } from 'react';
import { StatusBar, Dimensions } from "react-native";
import { Container, Button, Spinner, Header, Content, Form, Item, Input, Label, Icon, View, Toast, Text, Root } from 'native-base';
import * as Font from 'expo-font';
import { AsyncStorage } from 'react-native';
import config from "../config";


class Login extends Component {
  static navigationOptions = () => ({
    header: null,
  });


  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      email: '',
      password: ''
    }
    this.signin = this.signin.bind(this)
    this.register = this.register.bind(this)

  }

  signin() {
    fetch(config.server + '/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    })
      .then(async response => {
        if (response.login_status === 1) {
          await AsyncStorage.setItem('API_TOKEN', response.api_token)
          this.props.navigation.navigate('List')
        } else {
          this.setState({ password: '' })
          Toast.show({
            text: response.message,
            buttonText: 'Okay',
            duration: 1500,
            onClose: () => {
              this.setState({ password: '', email: '' })
            }
          })


        }
      })
  }

  register() {
    this.props.navigation.navigate('Signup')
  }


  async componentDidMount() {
    await Font.loadAsync({
      Roboto_medium: require("../assets/fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true })
  }
  render() {
    return this.state.fontLoaded ?
      (<Root><Container style={{ backgroundColor: "#eeeeee", flex: 1 }}>
        <StatusBar
          translucent={false}
          hidden={false}
          backgroundColor="#dddddd"
          barStyle="light-content"
        />
        <Content style={{ flex: 1 }}>
          <View style={{ flex: 1, height: Dimensions.get('screen').height, flexDirection: 'column', justifyContent: 'space-evenly', marginHorizontal: 50 }}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#038C65', fontSize: 40, fontWeight: '900' }} >Sign In</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Form>
                <Item style={{ borderColor: '#038C65' }} >
                  <Input onChangeText={text => { this.setState({ email: text }) }} value={this.state.email} textContentType='emailAddress' style={{ color: '#038C65', textAlign: 'center', fontSize: 20 }} placeholderTextColor="#038C65" placeholder="Enter email" />
                </Item>
                <Item style={{ marginTop: 20, borderColor: '#038C65' }}>
                  <Input onChangeText={text => { this.setState({ password: text }) }} secureTextEntry={true} value={this.state.password} style={{ color: '#038C65', textAlign: 'center', fontSize: 20 }} placeholderTextColor="#038C65" placeholder="Password" />
                </Item>
              </Form>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Button
                bordered
                rounded
                style={{
                  bottom: 100,
                  borderColor: "#038C65",
                  width: 150,
                  flex: 1,
                  backgroundColor: '#dddddd'
                }}
                onPress={this.signin}
              >
                <Text style={{ color: "#038C65", fontSize: 15, alignItems: 'center', justifyContent: 'center' }}>
                  SignIn
            </Text>
              </Button>
              <Button
                bordered
                rounded
                style={{
                  bottom: 100,
                  borderColor: "#038C65",
                  width: 150,
                  flex: 1,
                  marginLeft: 10,
                  backgroundColor: '#038C65'
                }}
                onPress={this.register}
              >
                <Text style={{ color: "#dddddd", fontSize: 15, alignItems: 'center', justifyContent: 'center' }}>
                  Register
            </Text>
              </Button>

            </View>
          </View>

        </Content>
      </Container></Root>) : <Container style={{ backgroundColor: '#038C65' }}><Spinner color='#dddddd' /></Container>;
  }
}

export default Login;