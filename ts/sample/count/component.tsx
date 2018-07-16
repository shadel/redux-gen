
import * as React from 'react';

interface IProps {
    count: number;
}
interface IDispatchs {
    increase: (count: number) => void;
    decrease: (count: number) => void;
}

const onClick = (callback: (count: number) => void) => (count: number) => (e: any) => callback(count);

const Count = ({ count, increase, decrease }: IProps & IDispatchs) => (
    <div>
        <span>Count Value: {count}</span>
        <button onClick={onClick(increase)(count)}>Increase</button>
        <button onClick={onClick(decrease)(count)}>Decrease</button>
    </div>
)
export default Count;