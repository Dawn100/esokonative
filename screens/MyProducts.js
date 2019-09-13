import React, { Component } from 'react';
import { Fab,Icon,Container,Content,Text } from "native-base";


class MyProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.gotoNew = this.gotoNew.bind(this);
        
    }
    gotoNew(){
        const { navigate } = this.props.navigation;
        navigate('Add')
    }
    render() { 
        return ( <Container>
            <Content>
            <Text>MyProducts</Text>
            
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#009688" }}
          position="bottomRight"
          onPress={this.gotoNew}
        >
          <Icon name="add" />
        </Fab>
        </Container> );
    }
}
 
export default MyProducts;