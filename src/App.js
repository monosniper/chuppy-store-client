import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './scss/App.scss';
import Footer from "./components/layout/Footer";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";

function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
