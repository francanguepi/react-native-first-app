import React, {useEffect, useState} from 'react';
import {listPokeOriginal} from '../data/PokemonList'
import {View, Text, Image, FlatList, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

const MyPokemonView = (props) => {
    return (
        <View style={{marginBottom: 100}}>
            <Text style = {{fontSize: 20, textAlign: 'center', marginVertical: 20}}>This is my Pokemon View</Text>
            <FlatList
                //data={listPokeOriginal}
                data={props.arrayPokemonCaptured}
                renderItem={({item}) => <PokemonItem pokemon = {item} />}  
            />
        </View>
    )
} 

const PokemonItem = ({pokemon}) => {
  return (
    <View style = {styles.containerItem}>
      <Text>This a Pokemon</Text>
        <Text>His name is {pokemon.name}, his level is {pokemon.level}</Text>
        {pokemon.isMale ? <Text>This is a male</Text> : <Text>This is a female</Text>}
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Image source={require('../assets/127.jpg')} style={styles.imagePokemon}/>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    containerItem: {
      paddingHorizontal: 20,
      marginBottom: 10
    },
    imagePokemon: {
        width: 200,
        height: 200,
        borderRadius: 30
    }

})

const mapStateToProps = (state) => {
  return {
    arrayPokemonCaptured: state.arrayPokemonCaptured.arrayPokemonCaptured
  }
};

export default connect(mapStateToProps)(MyPokemonView);