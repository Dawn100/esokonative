import { createStackNavigator,createAppContainer } from "react-navigation";
import ProductsList from "./screens/ProductsList";
import ProductDetail from "./screens/ProductDetail";
import AddProduct from "./screens/AddProduct";
import Splash from "./screens/Splash";
import Login from "./screens/Login";



const App = createStackNavigator({
    List:{screen:ProductsList},
    Splash:{screen:Splash},
    Login:{screen:Login},
    Detail:{screen:ProductDetail},
    Add:{screen:AddProduct}
  });


export default createAppContainer(App);