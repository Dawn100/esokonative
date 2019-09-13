import React, { Component } from "react";
import { StyleSheet, ImageBackground, StatusBar } from "react-native";
import { Button, Text, View } from "native-base";

import * as Font from "expo-font";

const styles = StyleSheet.create({
  title: {
    fontSize: 65,
    color: "#038C65",
    fontFamily:'SansForgetica-Regular',
    paddingTop: "60%",
    alignSelf: "center"
  },
  overlay: {
    flex: 1,
    backgroundColor: "#2f2f2fd0",
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
  }
  async componentWillMount() {
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
              flex:1
            }}
            onPress={this.next}
          >
            <Text style={{ color: "#038C65", fontSize: 15,alignItems:'center',justifyContent:'center' }}>
              Next
            </Text>
          </Button>
        </View>
        <StatusBar translucent backgroundColor={"transparent"} />
      </ImageBackground>
    ) : (
      <Text>loading Font</Text>
    );
  }
  next() {
    const { navigate } = this.props.navigation;
    navigate("List");
    clearInterval(this.state.intervalId);
  }
  componentDidMount() {
    // var id = setInterval(this.next, 100000);
    // this.setState({ intervalId: id });
  }
}

export default Splash;