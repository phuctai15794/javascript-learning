import reducer from "./reducer.js";

export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(`Action: ${action}`);
        console.log('Prev State: ', prevState);

        const nextState = reducer(prevState, action, args);
        
        console.log('Arguments: ', args);
        console.log('Next State: ', nextState);
        console.groupEnd();

        return nextState;
    }
}