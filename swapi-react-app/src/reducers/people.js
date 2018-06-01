import {List} from 'immutable';

export function people(state=new List(), action)
{ 
    if(action.type === 'LIST'){
        console.log('reducer');        
        return {peopleList:new List(action.people)} ;
    }
}