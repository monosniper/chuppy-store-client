import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './scss/App.scss';
import Footer from "./components/layout/Footer";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
    currency: "RUB",
    intent: "capture",
};

function App() {
    return (
        <PayPalScriptProvider options={initialOptions}>
            <BrowserRouter>
                <AppRouter/>
                <Footer />
            </BrowserRouter>
        </PayPalScriptProvider>
    );
}

export default App;
