import { Dispatch, Action } from 'redux';
import { getKeys } from './utils';


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


const createIAction = <T extends any, K extends keyof T>(key: K, obj: T): IAction<T, K> => ({
    create: genActionCreator(obj[key], Object.assign(obj, key, TypeMethod.CREATE)),
    update: genActionCreator(obj[key], Object.assign(obj, key, TypeMethod.UPDATE)),
    map: actionMapCreator(obj[key])
}) 

export const actionMapCreator = <T extends any>(reducerObject: T) => {
    const maps = getKeys(reducerObject).map<IAction<T, keyof T>>((key) => createIAction(key, reducerObject))
    return getKeys(reducerObject).reduce((res, key, idx)=> {
        res[key] = maps[idx];
        return res;
    }, {} as {
        [K in keyof T]: IAction<T, K>
    });
}