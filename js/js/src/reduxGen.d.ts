import { Reducer, Action, Dispatch } from 'redux';
export declare type AType = any;
export declare type UniqueType<T extends any, K extends keyof T, TypeMethod> = T & K & TypeMethod;
export declare enum TypeMethod {
    CREATE = "create",
    UPDATE = "update"
}
export interface IATypeExtend<T extends AType, TypeMethod> extends AType {
    type: T;
    method: TypeMethod;
}
export interface IRGAction<PT extends any, T extends AType = AType> extends Action<T> {
    payload: PT;
}
declare type IActionExtendType<T extends any, AT extends AType> = IRGAction<T, AT>;
interface IActionCreator<T extends any, AT extends AType> {
    (dispatch: Dispatch<IActionExtendType<T, AT>>): (payload: T) => void;
    action: IActionExtendType<T, AT>;
}
export interface IAction<T extends any, K extends keyof T> {
    create: IActionCreator<T[K], UniqueType<T, K, TypeMethod.CREATE>>;
    update: IActionCreator<T[K], UniqueType<T, K, TypeMethod.UPDATE>>;
    map: ActionMap<T[K]>;
}
export declare type ActionMap<T extends any> = {
    [K in keyof T]: IAction<T, K>;
};
export interface IReduxGenResult<T extends any> {
    reducers: Reducer<T, IRGAction<T>>;
    actions: ActionMap<T>;
}
export default function reduxGen<T extends any>(reducerDefault: T): IReduxGenResult<T>;
export {};
