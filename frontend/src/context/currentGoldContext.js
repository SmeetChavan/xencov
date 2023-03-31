import { useReducer } from "react";
import { useContext , createContext } from "react";

const dispatchContext = createContext();
const stateContext = createContext();

const priceReducer = (state , action) => {

    switch(action.type){
        case "UPDATE":
            return state = action.price;
        default:
            console.error("Failed to update price");
    }
}


export const PriceProvider = ({children}) => {

    const [state , dispatch] = useReducer(priceReducer , 5000);

    return (

        <dispatchContext.Provider value={dispatch}>

            <stateContext.Provider value={state}>

                {children}

            </stateContext.Provider>

        </dispatchContext.Provider>
    );
}

export const useDispatch = () => useContext(dispatchContext);
export const usePrice = () => useContext(stateContext);