import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TextInput, Image, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Lista = ({ navigation, route}) => {
  const [fornecedores, setFornecedores] = useState([]);
  const [filteredFornecedores, setFilteredFornecedores] = useState([]);
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
    setFilteredFornecedores(
      fornecedores.filter((fornecedor) =>
        fornecedor.nome.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, fornecedores]);

  const renderItem = ({ item, index }) => (
    <View style={[styles.itemContainer, {backgroundColor: index % 2 === 0 ? '#ddd' : '#eee'}]}>
      <Image source={item.image ? { uri: item.image } : require('./logo.svg')} style={styles.image} />
      <Text style={styles.itemText}>{item.nome}</Text>
      <Text style={styles.itemText}>{item.endereco}</Text>
      <Text style={styles.itemText}>{item.contato}</Text>
      <Text style={styles.itemText}>{item.categorias}</Text>
      <Button title="Excluir"/>
    </View>
  );

  /*Função limpar. Teste.  
  const limpar = async () => {
    try {
      const existingSuppliers = await AsyncStorage.removeItem('@fornecedor');
    } catch (e) {
      console.log(e);
    }
  };

  <Button title="Excluir" onPress={limpar}/>
  */

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Pesquisar"
      />
      <FlatList
        data={filteredFornecedores}
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
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemText: {
    flex: 1,
  },
});

export default Lista;