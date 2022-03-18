import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, Button, TouchableOpacity, StyleSheet} from 'react-native';


const PokemonDetailsView = ({navigation, route}) => {
    const {id, name, src} = route.params;
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [arrayType, setArrayType] = useState('');

    const fetchPokemonDetails = (idPokemon) => {
      const url = 'https://pokeapi.co/api/v2/pokemon/' + idPokemon;
      fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json.results);
        setWeight(json.weight);
        setHeight(json.height);
        setArrayType(json.types.map((item) => {
          return item.type.name
        }))
      })
    }

    useEffect(() => {
      fetchPokemonDetails(id);
    })


    return (
        <View>
          <Text>This is a detailed View of Pokemon id {id} and name {name}</Text>
          <Text>HEIGHT :  {height} , WEIGHT : {weight} AND TYPE : {arrayType}</Text>
          <View style={{alignItems: 'center'}}>
            <Image source={require('../assets/55.jpg')} style={styles.imagePokemon}/>
          </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    imagePokemon: {
        width: 200,
        height: 200,
    }
})

export default PokemonDetailsView;

