import {list} from '../actions/actionCreator';


export default class PeopleApi {
    static search(searchText){
        return dispatch => {
            fetch(`https://swapi.co/api/people/?search=${searchText}`)
            .then(response => response.json())
            .then(result => {
                console.log('peopleApi');
                dispatch(list(result.results));
                return result.results;
            })
        }
    }

}