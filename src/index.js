import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from "./store";

const store = new Store();

export const Context = createContext({
    store
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <Context.Provider value={{store}}>
        <App />
    </Context.Provider>
);
