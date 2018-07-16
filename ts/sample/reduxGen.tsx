import IStore from './IStore';
import reduxGen from '../src/reduxGen';
const DEFAULT_STORE: IStore = {
    count: 0
}

const {reducers, actions} = reduxGen<IStore>(DEFAULT_STORE);

export {
    reducers, actions
}