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