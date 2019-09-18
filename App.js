import { createStackNavigator,createAppContainer } from "react-navigation";
import ProductsList from "./screens/ProductsList";
import ProductDetail from "./screens/ProductDetail";
import AddProduct from "./screens/AddProduct";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import EditProduct from "./screens/EditProduct";
import config from "./config";

//console.log(config)

const App = createStackNavigator({
    Splash:{screen:Splash},
    Signup:{screen:Signup},
    Login:{screen:Login},
    List:{screen:ProductsList},
    Add:{screen:AddProduct},
    Edit:{screen:EditProduct},
    Detail:{screen:ProductDetail},
  });


export default createAppContainer(App);