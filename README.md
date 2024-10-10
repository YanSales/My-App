<!-- PROJECT LOGO -->
<div align="center">
   <a href="https://github.com/othneildrew/Best-README-Template">
      <img src="https://logodownload.org/wp-content/uploads/2014/12/estacio-logo-1-2048x1641.png" alt="estacio logo" width="80"                  height="80">
   </a>
    <h1 align="center"> Universidade Estácio de Taguatinga </h1>
     <hr>
</div> 

* DESENVOLVIMENTO FULL STACK- 
* Disciplina: RPG0023  - Vamos criar um App.
* Semestre Letivo: 2024.2
* Repositorio Git: https://github.com/YanSales/My-App

<hr>

* [YAN SILVA SALES](https://github.com/YanSales/My-App) - MATRICULA: 2023.0257.3592
<hr>
 <h1 align="center"> Missão Prática | Nível 1 | Mundo 4 </h1>
 <h2 align="left" > Adicionando interatividade com o React Native. </h2> 
 <h3>Microatividade 1: Configurar o ambiente de desenvolvimento React Native </h3>
 <h3>Microatividade 2: Implementar a funcionalidade de entrada de texto em um componente React Native</h3>
 <h3>Microatividade 3: Implementar um Componente de Lista Dinâmica (ScrollView)</h3>
 <h3>Microatividade 4: Criando o visualizador de listas </h3>
 <h3>Microatividade 5: Empregar imagens, seja para exibir gráficos, ícones, fotos ou outros elementos visuais em um aplicativo React Native </h3>
 <hr>

 <h2> :clipboard: Objetivos da Prática </h2>

* Configurar o ambiente de desenvolvimento React Native.
* Implementar a funcionalidade de entrada de texto em um componente
React Native.
* Implementar um Componente de Lista Dinâmica (ScrollView);.
* Implementar componentes React Native para exibir informações de forma
dinâmica em listas;
* Empregar elementos visuais em um aplicativo React Native.
<hr>

<h2> Códigos </h2>

* App.js

``` Javascript
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
```

* Cadastro.jsx

``` Javascript
import React, { useState } from 'react';
import { Text, Button, Image, TextInput, View, Platform, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createElement } from 'react';


const Cadastro = () => {

  const [alerta, setAlerta] = useState('');

  const [fornecedor, setFornecedor] = useState({
    nome: '',
    endereco: '',
    contato: '',
    categorias: '',
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (field, value) => {
    setFornecedor({
      ...fornecedor,
      [field]: value,
    });
  };

  const selecionaImagem = Platform.OS === 'web' ? (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  } : () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setImage(image.path);
    });
  };

  const handleSubmit = async () => {
    try {
      const existingSuppliers = await AsyncStorage.getItem('@fornecedor');
      let newSuppliers = JSON.parse(existingSuppliers);
      if (!newSuppliers || !Array.isArray(newSuppliers)) {
        newSuppliers = [];
      }
      newSuppliers.push({ ...fornecedor, image });
      await AsyncStorage.setItem('@fornecedor', JSON.stringify(newSuppliers));
      setFornecedor({nome:'', 
      endereco: '',
      contato: '',
      categorias: ''});
      setAlerta('Usuario Cadastrado! ')
    } catch (e) {
      console.log(e);
    }
  };

  let ImagePicker;
  if (Platform.OS !== 'web') {
    ImagePicker = require('react-native-image-crop-picker').default;
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={fornecedor.nome}
          onChangeText={(value) => handleInputChange('nome', value)}
        />
      </View>
      <br />
      <View>
        <Text style={styles.label}>Endereço:</Text>
        <TextInput
          style={styles.input}
          value={fornecedor.endereco}
          onChangeText={(value) => handleInputChange('endereco', value)}
        />
      </View>
      <br />
      <View>
        <Text style={styles.label}>Contato:</Text>
        <TextInput
          style={styles.input}
          value={fornecedor.contato}
          onChangeText={(value) => handleInputChange('contato', value)}
        />
      </View>
      <br />
      <View>
        <Text style={styles.label}>Categorias:</Text>
        <TextInput
          style={styles.input}
          value={fornecedor.categorias}
          onChangeText={(value) => handleInputChange('categorias', value)}
        />
      </View>
      <br />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {Platform.OS === 'web' ? (
        <input type="file" accept="image/*" onChange={selecionaImagem} />
      ) : (
        <Button title="Selecionar Imagem" onPress={selecionaImagem} />
      )}
      <br />
      <Button title="Cadastrar" onPress={handleSubmit}  
      />
      <Text>{alerta}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  label: {
    width: 100,
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  image: {
    width: 20,
    height: 200,
    marginBottom: 20,
  },
});

export default Cadastro;
```

* Inicial.jsx

``` Javascript
import React from 'react';
import { View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Inicial() {
  const navigation = useNavigation();

  return (
    <View 
    style={{
      backgroundColor: 'white',
    }}
    >
      <View 
      style = {{
        padding:10,
        width:300
      }}
      >
      <Button
          title="Cadastrar Fornecedor"
          onPress={() => navigation.navigate('Cadastro')}
      />
      </View>
      <View 
      style= {{
        padding:10,
        width:300
      }}
      >
        <Button
          title="Lista de Fornecedores"
          onPress={() => navigation.navigate('Lista')}
        />
      </View>  
    </View>

  );
}


export default Inicial;
```

* Lista.jsx

``` Javascript
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TextInput, Image, StyleSheet,Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Lista = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [localFornecedor, setLocalFornecedor] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@fornecedor')
        setFornecedores(jsonValue != null ? JSON.parse(jsonValue) : []);
      } catch(e) {
        console.log(e);
      }
    }

    fetchFornecedores();
  }, []);

  useEffect(() => {
    setLocalFornecedor(
      fornecedores.filter((fornecedor) =>
        fornecedor.nome.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, fornecedores]);

  const deleteFornecedor = (index) => {
    const itensCopy = Array.from(fornecedores);
    itensCopy.splice(index, 1);
    setFornecedores(itensCopy);
    AsyncStorage.setItem('@fornecedor', JSON.stringify(fornecedores));
    //AsyncStorage.removeItem('@fornecedor');
  }

  const renderItem = ({ item, index }) => (
      <View style={[styles.itemContainer, {backgroundColor: index % 2 === 0 ? '#e0ffff' : '#778899'}]}>
        <Button 
        title="Excluir" 
        onPress={() => deleteFornecedor(index)}
        />
        <Text style={styles.itemText}>{item.nome}</Text>
        <Text style={styles.itemText}>{item.endereco}</Text>
        <Text style={styles.itemText}>{item.contato}</Text>
        <Text style={styles.itemText}>{item.categorias}</Text>
        <Image source={item.image ? { uri: item.image } : require('./logo.svg')} style={styles.image} />
      </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Pesquisar"
      />
      <FlatList
        data={localFornecedor}
        renderItem={renderItem}
        keyExtractor={(item) => item.nome}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',    
  },
  input: {
    height: 30,
    width:500,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 1,
    marginBottom: 5,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 1,
  },
  itemText: {
    flex: 1,
    fontSize: 20,
  },
});

export default Lista;
```
 <br>
  <hr>
  
<h1>Resultados: </h1>
:triangular_flag_on_post: Microatividade 1: 
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/Microatividades/ma1/public/Microatividade1.png" alt="resultado 1" width="640" height="360">


<br>
:triangular_flag_on_post: Microatividade 2: 
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/Microatividades/ma1/public/MicroAtividade2.png" alt="resultado 1" width="640" height="360">

<br>
:triangular_flag_on_post: Microatividade 3: 
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/Microatividades/ma1/public/MicroAtividade%203.png" alt="resultado 1" width="640" height="360">


<br>
:triangular_flag_on_post: Microatividade 4: 
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/Microatividades/ma1/public/Microatividade%204.1.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/Microatividades/ma1/public/Microatividade%204.2.png" alt="resultado 1" width="640" height="360">


<br>
:triangular_flag_on_post: Microatividade 5: 
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/Microatividades/ma1/public/Microatividade%205.1.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/Microatividades/ma1/public/Microat5ividade%205.2.png" alt="resultado 1" width="640" height="360">

<br>
:triangular_flag_on_post: Cadastro App: 
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%201.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%202.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%203.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%204.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%20Home.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%20Cadastrar.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%20Cadastro%201.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%20Cadastro%202.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%20Lista.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%20Lista%201.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%20Lista%202.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%20Lista%203.png" alt="resultado 1" width="640" height="360">
<img src="https://github.com/Gregdev22/Missao-1-Mundo-4/blob/main/cadastro_app/public/MP%20Lista%204%20Excluir.png" alt="resultado 1" width="640" height="360">
<br>


https://github.com/Gregdev22/Missao-1-Mundo-4/assets/103840468/13488ef0-5b26-402b-977f-2893db763e58


<br>
<hr>
