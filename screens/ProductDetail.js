import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Platform, AsyncStorage, Dimensions } from "react-native";
import {
  Container,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Card, CardItem, Spinner
} from "native-base";
import * as Font from 'expo-font';
import ReactNativeParallaxHeader from 'react-native-parallax-header';

const SCREEN_HEIGHT = Dimensions.get('screen').height
import config from "../config";


const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 30
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 15,

  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: '#038C65',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

class ProductDetail extends Component {
  static navigationOptions = () => ({
    header: null,
  });
  constructor(props) {
    super(props);
    this.state = { product: {}, fetched: false }
    this.api_token = ""
  }

  async componentDidMount() {
    var api_token = await AsyncStorage.getItem('API_TOKEN')
    this.api_token = api_token

    await Font.loadAsync({
      Roboto_medium: require("../assets/fonts/Roboto_medium.ttf")
    });
    await fetch(config.server + "/products/" + this.props.navigation.getParam('id') + "?api_token=" + this.api_token, {
      method: 'GET',
    }).then(response => response.json()).then(response => {
      this.setState({
        product: response,
        fetched: true,
      })
    })
  }


  renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <Left>
          <Icon name='md-arrow-back' onPress={() => { this.props.navigation.goBack() }} style={{ color: '#ffffff' }} />
        </Left>
        <Right>
          <Icon onPress={() => { this.props.navigation.navigate('List') }} name='md-list' style={{ color: '#ffffff' }} />
        </Right>
      </View>
    </View>
  )
  renderContent = () => (
    <ScrollView>
      <Card transparent>
        <CardItem header bordered first >
          <Text style={{ color: '#038C65' }}>Price</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ color: 'orange', fontSize: 30, fontWeight: '900' }}>
              Kshs. {this.state.product.price}
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Card transparent>
        <CardItem header first bordered>
          <Text style={{ color: '#038C65' }}>Description</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ color: '#717171' }}>
              {this.state.product.description}
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Card transparent>
        <CardItem header first bordered>
          <Text style={{ color: '#038C65' }}>Category</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ color: '#717171' }}>
              {this.state.product.category.name}
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Card transparent>
        <CardItem header first bordered>
          <Text style={{ color: '#038C65' }}>Stock</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{ color: '#717171' }}>
              {this.state.product.stock}
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Card transparent>
        <CardItem header first bordered>
          <Text style={{ color: '#038C65' }}>Posted By</Text>
        </CardItem>
        <CardItem>
          <Body style={{ height: 100 }}>
            <Text style={{ color: '#717171' }}>
              {this.state.product.user.name}
            </Text>
            <Text style={{ color: '#717171' }}>
              Contact {this.state.product.user.email}
            </Text>
          </Body>
        </CardItem>
      </Card>


    </ScrollView>
  )
  render() {
    return this.state.fetched ? (<View style={styles.container}>
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={250}
        extraScrollHeight={20}
        navbarColor="#038C65"
        title={this.state.product.name}
        titleStyle={styles.titleStyle}
        backgroundImage={
          { uri: this.state.product.photo, } // Put your own image here
        }
        backgroundImageScale={1.2}
        renderNavBar={this.renderNavBar}
        renderContent={this.renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScrollBeginDrag: () => { },
          onScrollEndDrag: () => { },
        }}
      />
    </View>) : <Container style={{ backgroundColor: '#038C65' }}><Spinner color='#dddddd' /></Container>;
  }
}

export default ProductDetail;