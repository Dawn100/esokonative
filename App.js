import { createStackNavigator,createAppContainer } from "react-navigation";
import ProductsList from "./screens/ProductsList";
import ProductDetail from "./screens/ProductDetail";
import AddProduct from "./screens/AddProduct";
import Splash from "./screens/Splash";
import Login from "./screens/Login";



const App = createStackNavigator({
    List:{screen:ProductsList},
    Add:{screen:AddProduct},
    Splash:{screen:Splash},
    Login:{screen:Login},
    Detail:{screen:ProductDetail},
  });


export default createAppContainer(App);