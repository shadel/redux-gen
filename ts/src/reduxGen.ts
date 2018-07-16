import {Reducer, Action, Dispatch, combineReducers} from 'redux';

export type AType = any;

export type UniqueType<T extends any, K extends keyof T, TypeMethod> = T & K & TypeMethod;


export enum TypeMethod {
    CREATE = "create",
    UPDATE = "update" 
}
export interface IATypeExtend<T extends AType, TypeMethod> extends AType {
    type: T,
    method: TypeMethod
}

export interface IRGAction<PT extends any, T extends AType = AType> extends Action<T> {
    payload: PT
}

type IActionExtendType<T extends any, AT extends AType> = IRGAction<T, AT>;

interface IActionCreator<T extends any, AT extends AType> {
    (dispatch: Dispatch<IActionExtendType<T, AT>>): (payload: T)=> void;
    action: IActionExtendType<T, AT>;
}

const genActionCreator = <T extends any, AT extends AType>(defaultValue: T, type: AT) => {
    
    const action:IActionExtendType<T, AT> = {
        type: type,
        payload: defaultValue
    }
    const aCreator = (dispatch: Dispatch<IActionExtendType<T, AT>>) => (payload: T) => dispatch({
        type: action.type,
        payload
    });
    return Object.assign(aCreator, {action})
}

export interface IAction<T extends any, K extends keyof T> {
    create: IActionCreator<T[K], UniqueType<T, K, TypeMethod.CREATE>>;
    update: IActionCreator<T[K], UniqueType<T, K, TypeMethod.UPDATE>>;
    map: ActionMap<T[K]>
}

export type ActionMap<T extends any>  = {
    [K in keyof T]: IAction<T, K>;
}


export interface IReduxGenResult<T extends any> {
    reducers: Reducer<T, IRGAction<T>>,
    actions: ActionMap<T>
}

const getKeys = <T extends any>(o: T): Array<keyof T> => {
    const keys:Array<keyof T> = [];
    for (let key in o) {
        keys.push(key);
    }
    return keys;
}

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
const reducerCreator = <T extends any>(reducerObject: T, actionMap: ActionMap<T>): Reducer<T, IRGAction<T>> => {
    if (typeof reducerObject === 'object' && reducerObject.length === undefined) {
        return createCombineReducer(reducerObject, actionMap);
    }
}

const createIAction = <T extends any, K extends keyof T>(key: K, obj: T): IAction<T, K> => ({
    create: genActionCreator(obj[key], Object.assign(obj, key, TypeMethod.CREATE)),
    update: genActionCreator(obj[key], Object.assign(obj, key, TypeMethod.UPDATE)),
    map: actionMapCreator(obj[key])
}) 

const actionMapCreator = <T extends any>(reducerObject: T) => {
    const maps = getKeys(reducerObject).map<IAction<T, keyof T>>((key) => createIAction(key, reducerObject))
    return getKeys(reducerObject).reduce((res, key, idx)=> {
        res[key] = maps[idx];
        return res;
    }, {} as {
        [K in keyof T]: IAction<T, K>
    });
}
export default function reduxGen<T extends any>(reducerDefault: T): IReduxGenResult<T>  {
    const actions = actionMapCreator(reducerDefault);
    const reducers = reducerCreator(reducerDefault, actions);
    return {
        reducers,
        actions
    }
}