import IStore from '../IStore';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Count from './component';
import {actions} from '../reduxGen';

const mapProps = ({count}: IStore) => {
    return {
        count
    }
}

const mapDispatchs = (dispatch: Dispatch)  => {
    return {
        increase: (count) => {
            actions.count.update(dispatch)(count + 1);
        },
        decrease: (count) => {
            actions.count.update(dispatch)(count - 1);
        }
    }
}

export default connect(mapProps, mapDispatchs)(Count);