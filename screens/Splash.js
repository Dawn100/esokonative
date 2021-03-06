import React, { Component } from "react";
import { StyleSheet, ImageBackground, StatusBar, AsyncStorage } from "react-native";
import { Button, Text, View, Spinner } from "native-base";
import * as Font from "expo-font";


const styles = StyleSheet.create({
  title: {
    fontSize: 65,
    color: "#038C65",
    fontFamily: 'SansForgetica-Regular',
    paddingTop: "60%",
    alignSelf: "center"
  },
  overlay: {
    flex: 1,
    backgroundColor: "#aaaaaad0",
    flexDirection: "column"
  }
});


class Splash extends Component {


  static navigationOptions = {
    header: null //removes the top navigation bar
  };


  constructor(props) {
    super(props);
    this.state = { intervalId: -1, fontLoaded: false };
    this.next = this.next.bind(this);
    this.api_token = ''
  }


  async componentWillMount() {
    this.api_token = await AsyncStorage.getItem('API_TOKEN')
    await Font.loadAsync({
      Roboto_medium: require("../assets/fonts/Roboto_medium.ttf"),
      "SansForgetica-Regular": require("../assets/fonts/forg.otf")
    });
    this.setState({ fontLoaded: true });
  }


  render() {
    return this.state.fontLoaded ? (
      <ImageBackground
        source={require("../assets/images/img3.jpg")}
        style={{ flex: 1 }}
      >
        <StatusBar
          hidden={false}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>Esoko</Text>
          <Button
            bordered
            rounded
            style={{
              bottom: 50,
              position: "absolute",
              alignSelf: "center",
              borderColor: "#038C65",
              width: 200,
              flex: 1
            }}
            onPress={this.next}
          >
            <Text style={{ color: "#038C65", fontSize: 15, alignItems: 'center', justifyContent: 'center' }}>
              Next
            </Text>
          </Button>
        </View>
        <StatusBar translucent backgroundColor={"transparent"} />
      </ImageBackground>
    ) : (
        <Spinner color='green' />
      );
  }


  next() {
    const { navigate } = this.props.navigation;
    if (this.api_token) {
      navigate("List");
    } else {
      navigate("Login");
    }
    clearInterval(this.state.intervalId);
  }


  componentDidMount() {
    var id = setInterval(this.next, 5000);
    this.setState({ intervalId: id });
  }


}

export default Splash;