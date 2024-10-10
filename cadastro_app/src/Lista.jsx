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