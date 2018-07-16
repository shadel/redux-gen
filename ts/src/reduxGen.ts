import { Reducer } from 'redux';
import { IRGAction, ActionMap, actionMapCreator } from './actions';
import { reducerCreator } from './reducers';


export interface IReduxGenResult<T extends any> {
    reducers: Reducer<T, IRGAction<T>>,
    actions: ActionMap<T>
}



export default function reduxGen<T extends any>(reducerDefault: T): IReduxGenResult<T>  {
    const actions = actionMapCreator(reducerDefault);
    const reducers = reducerCreator(reducerDefault, actions);
    return {
        reducers,
        actions
    }
}