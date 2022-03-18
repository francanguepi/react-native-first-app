const initialState = { arrayPokemonCaptured: []};

function setArrayPokemonCaptured(state = initialState, action: {type: string, value: any;}){
    let nextState;

    switch(action.type) {
        case 'ADD_TO_LIST_POKEMON':
            nextState = {
                ...state,
                arrayPokemonCaptured: [...state.arrayPokemonCaptured, action.value]
            };
            console.log('[STORE] Add to pokemons captured:', action.value)
            return nextState || state;
        case 'REMOVE_POKEMON_IN_LIST':
            nextState = {
                ...state,
                arrayPokemonCaptured: state.arrayPokemonCaptured.filter((pokemon: any) => pokemon.id === action.value.id)
            };
            return nextState || state;
        default: 
            return state;
    }
}

export default setArrayPokemonCaptured;
