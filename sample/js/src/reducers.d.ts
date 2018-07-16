import { IRGAction, ActionMap } from './actions';
import { Reducer } from 'redux';
export declare const reducerCreator: <T extends any>(reducerObject: T, actionMap: ActionMap<T>) => Reducer<T, IRGAction<T, any>>;
