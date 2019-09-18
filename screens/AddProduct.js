import React, { Component } from 'react';
import { StatusBar, AsyncStorage } from "react-native";
import { Text, Input, Picker, Button, Icon, Form, Container, Header, Content, Item, Left, Body, Title, Right } from 'native-base';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Font from 'expo-font';
import config from "../config";

class AddProduct extends Component {

  static navigationOptions = () => ({
    header: null
  });
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category_id: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      fontLoaded: false,
      imagename: '',
      photo: {}
    }
    this.state = { category_id: 0, categories: [], fontLoaded: false }
    this.pick = this.pick.bind(this)
    this.send = this.send.bind(this)
    this.api_token = ""
  }

  async pick() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      this.setState({ imagename: filename, photo: { uri: localUri, name: filename, type } })
    }
  }

  send() {

    let formData = new FormData();
    formData.append('photo', this.state.photo)
    formData.append('category_id', this.state.category_id)
    formData.append('name', this.state.name)
    formData.append('description', this.state.description)
    formData.append('price', this.state.price)
    formData.append('stock', this.state.stock)


    fetch(config.server + '/products?api_token=' + this.api_token, {
      method: 'POST',
      body: formData
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).then(response => {

      alert("Product updated successfully")
      const { navigate } = this.props.navigation;
      navigate('Detail', { id: response.product.id })
    })
  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }


  async componentDidMount() {
    var api_token = await AsyncStorage.getItem('API_TOKEN')
    this.api_token = api_token
    this.getPermissionAsync();
    await Font.loadAsync({
      Roboto_medium: require("../assets/fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });

    await fetch(config.server + '/categories').then(response => response.json())
      .then(response => {
        this.setState({ categories: response })
      })
  }


  render() {
    return (this.state.fontLoaded ? <Container>
      <Header style={{ backgroundColor: "#038C65" }} hasTabs>
        <StatusBar
          translucent={false}
          hidden={false}
          backgroundColor="#038C65"
          barStyle="light-content"
        />
        <Left style={{ flex: 1 }} />
        <Body style={{ flex: 1 }}>
          <Title style={{ color: "#fff" }}>Add Product</Title>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
      <StatusBar
        translucent={false}
        hidden={false}
        backgroundColor="#038C65"
        barStyle="light-content"
      />
      <Content>
        <Form style={{ margin: 20 }}>
          <Item>
            <Picker
              selectedValue={this.state.category_id}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({ category_id: itemIndex === 0 ? 0 : itemValue })}>
              <Picker.Item label="Choose a category..." />
              {this.state.categories.map(category => <Picker.Item key={category.id} label={category.name} value={category.id} />)}

            </Picker>
          </Item>
          <Item>
            <Input onChangeText={text => this.setState({ name: text })} placeholder="Enter product name" />
          </Item>
          <Item>
            <Input onChangeText={text => this.setState({ description: text })} multiline numberOfLines={5} placeholder="Enter product description" />
          </Item>
          <Item>
            <Input onChangeText={text => this.setState({ price: text })} placeholder="Enter price" />
          </Item>
          <Item>
            <Input onChangeText={text => this.setState({ stock: text })} placeholder="Items in stock" />
          </Item>
          <Item>
            <Text>{this.state.imagename}</Text>
            <Icon name="md-images" style={{ color: '#038C65', fontSize: 50 }} onPress={this.pick} />
          </Item>
        </Form>
        <Button
          success
          rounded
          style={{
            alignSelf: "center",
            borderColor: "#038C65",
            backgroundColor: "#038C65",
            width: 200,
            flex: 1
          }}
          onPress={this.send}
        >
          <Text style={{ fontSize: 15, alignItems: 'center', justifyContent: 'center' }}>
            Save
            </Text>
        </Button>
      </Content>

    </Container> : null);
  }
}

export default AddProduct;