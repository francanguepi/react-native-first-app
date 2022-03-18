import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, Button, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {listPokeOriginal} from '../data/PokemonList';
import {connect} from 'react-redux';
import { Pokemon } from '../models/Pokemon';

const HomeView = (props) => {   
  const [counterPokedex, setCounterPokedex] = useState(0);
  const [listPoke, setListPoke] = useState(listPokeOriginal);
  const [isDataReceived, setIsDataReceived] = useState(false);
  
  const onViewPokemonDetail = (idPokemon, namePokemon) => {
    props.navigation.navigate("Details", {id: idPokemon, name: namePokemon});
  }

  const onNext = () => {
    if(counterPokedex == listPoke.length - 1)
      setCounterPokedex(0)
    else
      setCounterPokedex(counterPokedex + 1);
  }

  const onPrevious = () => {
    setCounterPokedex(counterPokedex - 1);
    console.log(counterPokedex.toString());
  }

  const onCapturePokemon = () => {
    const currentPokemon = listPoke[counterPokedex];
    
    const action = {type: 'ADD_TO_LIST_POKEMON', value: currentPokemon};
    props.dispatch(action)
    
  }

  const fetchPokemon = () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200";

    fetch(url) //interroge cette url
    .then(response => response.json())       // formate au format json les données recupérées
    //.then(json => console.log(json.results))  // affiche les données formatées  dans la console
    .then(json => {
      const newArray = json.results.map((pokemon, index) => {
        let indexPokemon = index + 1;
        pokemon.id = indexPokemon;
        pokemon.name = pokemon.name;
        pokemon.level = 15;
        pokemon.isMale = true;
        pokemon.src = 'https://pokeres.bastionbot.org/images/pokemon/' + indexPokemon + '.png';
        pokemon.onClickPokemon = onViewPokemonDetail

        return pokemon;
      })

      console.log(newArray);
      setListPoke(newArray);
      setIsDataReceived(true);
    })
    .catch(error => console.log('ERROR : ', error)) //en cas d'erreur affiche les données formatées  dans la console
  }
 
  
  useEffect(() => {
    fetchPokemon();
  }, []);

  return(
    <View style = {styles.mainContainer}>
      <View style = {styles.titleContainer}>
        <Text style={styles.textTitle}>Pokédex Application</Text>
      </View> 
      <View style = {styles.pokemonContainer}>
        {isDataReceived ? 
          <PokemonInfo pokemon={listPoke[counterPokedex]}/> :
          <ActivityIndicator size="large"/>
        }
      </View>
      <View style={{marginHorizontal: 30, marginBottom: 10}}>
        <Button title='Capturer' onPress={() => onCapturePokemon()}/>     
      </View>
      <View style={{marginHorizontal: 30, marginBottom: 10}}>
        <Button title='Suivant' onPress={() => onNext()}/>     
      </View>

      {/* <FlatList
        data={listPoke}
        renderItem={({item}) => <PokemonInfo pokemon = {item} />}  
      /> */}
    </View >
  )
}

const PokemonInfo = ({pokemon}) => {
    return(
        <TouchableOpacity onPress={() => pokemon.onClickPokemon(pokemon.id, pokemon.name)}>
          <Text>This a Pokemon</Text>
          <Text>His name is {pokemon.name}, his level is {pokemon.level}</Text>
          {pokemon.isMale ? <Text>This is a male</Text> : <Text>This is a female</Text>}
          <Image source={require('../assets/25.jpg')} style={styles.imagePokemon}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  titleContainer: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  pokemonContainer: {
    flex: 4,
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: 50
  },
  imagePokemon: {
    width: 200,
    height: 200
  }

});


const mapDispatchToProps = (dispatch) => { // mapDispatchToProps : permet de connecter le store avec les props de l'app
  return{
    dispatch: (action) => {dispatch(action)}
  };
};

const mapStateToProps = (state) => {
  return {
    arrayPokemonCaptured: state.arrayPokemonCaptured.arrayPokemonCaptured
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);