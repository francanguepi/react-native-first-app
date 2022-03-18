/* CE FICHIER PERMET DE STOCKER TOUS LES REDUCERS QUI ONT ETE CREES */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, createStore } from "redux";
import { persistCombineReducers, persistReducer, persistStore } from "redux-persist";
import setArrayPokemonCaptured from "./reducers/arrayPokemonCapturedReducer";

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage 
};

const rootReducer = combineReducers({
    arrayPokemonCaptured: setArrayPokemonCaptured
})

//persistReducer : permet de stocker toutes les variables qui ne seront pas perdues après quele téléphone soit éteint
export default createStore(persistReducer(rootPersistConfig, rootReducer))