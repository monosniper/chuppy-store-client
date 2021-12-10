import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './scss/App.scss';
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";
import {Helmet} from "react-helmet";

function App() {
    return (
        <BrowserRouter>
            <Helmet>
                <meta name="enot" content="9471639158398EVHg7Hu6xRooFoxpf1sfxf_153IG8Adf" />
            </Helmet>
            <AppRouter/>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
