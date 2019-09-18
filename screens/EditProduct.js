import React, { Component } from 'react';
import { StatusBar, AsyncStorage } from "react-native";
import { View, Text, Input, Picker, Button, Icon, Form, Container, Header, Content, Item, Label, Left, Body, Title, Right } from 'native-base';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Font from 'expo-font';
import config from "../config";


class EditProduct extends Component {


    static navigationOptions = () => ({
        header: null
    });


    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category_id: 0,
            name: '',
            description: '',
            price: 0,
            stock: 0,
            fontLoaded: false,
            imagename: '',
            photo: {},
            photo_changed: false
        }
        this.save = this.save.bind(this);
        this.pick = this.pick.bind(this);
        this.api_token = "";
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
        await fetch(config.server + '/categories').then(response => response.json()).then(response => {
            this.setState({
                categories: response
            })
        })
        await fetch(config.server + '/products/' + this.props.navigation.getParam('id') + '?api_token=' + this.api_token).then(data => data.json()).then(data => {
            this.setState({
                category_id: data.category_id,
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                imagename: data.photo.split('/').pop()
            })
        })
        await this.getPermissionAsync();
        await Font.loadAsync({
            Roboto_medium: require("../assets/fonts/Roboto_medium.ttf")
        });
        this.setState({ fontLoaded: true });
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

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            // Upload the image using the fetch and FormData APIs

            // Assume "photo" is the name of the form field the server expects
            this.setState({ imagename: filename, photo: { uri: localUri, name: filename, type }, photo_changed: true })
        }
    }








    save() {

        var myjson = {
            category_id: this.state.category_id,
            name: this.state.name,
            description: this.state.description,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
        }

        let formData = new FormData();
        formData.append('photo', this.state.photo)


        fetch(config.server + '/products/' + this.props.navigation.getParam('id') + '?api_token=' + this.api_token, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(myjson)
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(putresponse => {
            if (this.state.photo_changed) {
                fetch(config.server + '/products/' + this.props.navigation.getParam('id') + '/setphoto?api_token=' + this.api_token, {
                    method: 'POST',
                    body: formData
                }).then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                }).then(postresponse => {
                    alert("Product updated successfully")
                    const { navigate } = this.props.navigation;
                    navigate('Detail', { id: putresponse.product.id })
                })
            } else {
                alert("Product updated successfully")
                const { navigate } = this.props.navigation;
                navigate('Detail', { id: putresponse.product.id })
            }
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
                    <Title style={{ color: "#fff" }}>Edit Product</Title>
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
                            onValueChange={(itemValue, itemIndex) => this.setState({ category_id: itemValue })}>
                            <Picker.Item label="Choose a category..." />
                            {this.state.categories.map(category => <Picker.Item key={category.id} label={category.name} value={category.id} />)}

                        </Picker>
                    </Item>
                    <Item>
                        <Input value={this.state.name} onChangeText={text => this.setState({ name: text })} placeholder="Enter product name" />
                    </Item>
                    <Item>
                        <Input value={this.state.description} onChangeText={text => this.setState({ description: text })} multiline numberOfLines={5} placeholder="Enter product description" />
                    </Item>
                    <Item>
                        <Input value={this.state.price + ''} onChangeText={text => this.setState({ price: text })} placeholder="Enter price" />
                    </Item>
                    <Item>
                        <Input value={this.state.stock + ''} onChangeText={text => this.setState({ stock: text })} placeholder="Items in stock" />
                    </Item>
                    <Item style={{ display: 'flex', flexDirection: 'column' }}>
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
                    onPress={this.save}
                >
                    <Text style={{ fontSize: 15, alignItems: 'center', justifyContent: 'center' }}>
                        Save
            </Text>
                </Button>
            </Content>
        </Container>
            : null);
    }
}

export default EditProduct;