import { IRGAction, UniqueType, TypeMethod, IAction, ActionMap } from './actions';
import { Reducer, combineReducers } from 'redux';
import { getKeys } from './utils';

const createSingleReducer = <
T extends any, 
A extends IRGAction<T, UniqueType<T, K, TypeMethod>>, 
K extends keyof T>(
    defaultValue: T, 
    actionMap: IAction<T, K>
):Reducer<T, IRGAction<T, UniqueType<T, K, TypeMethod>>> => (
    state: T = defaultValue,
    action: A
  ): T => {
      switch (action.type) {
          case actionMap.create.action.type: 
              return action.payload;
          case actionMap.update.action.type: 
                  return action.payload;
      }
    return state;
  }
const createCombineReducer = <T extends any>(defaultValue: T, actionMap: ActionMap<T>) => {
    const maps = getKeys(defaultValue).map((key) => {
        const singleValue = defaultValue[key];
        let red;
        if (typeof singleValue === 'object') {
            red = reducerCreator(singleValue, actionMap[key].map);
        } else {
            red = createSingleReducer(singleValue, actionMap[key]);
        }
        return red;
    });
    
    const reducers  = getKeys(defaultValue).reduce((res, key, idx) => {
        res[key] = maps[idx];
        return res;
    }, {} as {
        [K in keyof T]: Reducer<T[K], IRGAction<T[K], UniqueType<T, K, TypeMethod>>>
    });
    return combineReducers(reducers);
  }
export const reducerCreator = <T extends any>(reducerObject: T, actionMap: ActionMap<T>): Reducer<T, IRGAction<T>> => {
    if (typeof reducerObject === 'object' && reducerObject.length === undefined) {
        return createCombineReducer(reducerObject, actionMap);
    }
}