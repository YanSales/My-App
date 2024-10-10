import logo from './logo.svg';
import './App.css';
import CatApp from './CatApp';
import Cadastro from './Cadastro';
import Lista from './Lista';
import Inicial from './Inicial';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function App() {
  return (
    //<Cat/>
    //<CatApp/>
    <NavigationContainer theme={DarkTheme}> 
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen name="Home" component={Inicial} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Lista" component={Lista}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
