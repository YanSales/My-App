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