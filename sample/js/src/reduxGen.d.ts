import { Reducer } from 'redux';
import { IRGAction, ActionMap } from './actions';
export interface IReduxGenResult<T extends any> {
    reducers: Reducer<T, IRGAction<T>>;
    actions: ActionMap<T>;
}
export default function reduxGen<T extends any>(reducerDefault: T): IReduxGenResult<T>;
