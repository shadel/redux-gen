import reduxGen, { UniqueType, TypeMethod } from '../src/reduxGen';
import {Action, Dispatch} from 'redux';


interface IApp {
    count: number,
    show: boolean;
    coin: number;
    maps: {
        count: number
    }
}

const {reducers, actions} = reduxGen<IApp>({
    count: 0,
    show: true,
    coin: 0,
    maps: {
        count: 1
    }
});

const actionCountKey = actions.count.create.action;
const actionShowKey = actions.show.update.action;
const actionMapKey = actions.maps.create.action;

type ActionCount = (typeof actionCountKey)
type ActionShow = typeof  actionShowKey;

const createDispatch = <T extends Action>(): Dispatch<T> => <T>(action: T): T => {
    console.log(action);
    return action;
}
const dispatch = createDispatch<ActionCount>();
actions.count.create(dispatch)(1);
actions.maps.map.count.create(dispatch)
