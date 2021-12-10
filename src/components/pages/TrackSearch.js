import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {HOME_ROUTE, TRACK_RESULT_ROUTE} from "../../utils/routes";
import Button from "../Button";
import Container from "../layout/Container";
import Logo from "../Logo";

const TrackSearch = () => {

    const navigate = useNavigate();
    const [fio, setFio] = useState('');

    const handleClick = () => {
        navigate(TRACK_RESULT_ROUTE);
    }

    return (
        <>
            <Container className="lg auto-height">
                <div style={{padding: '40px 0'}}>
                    <Link to={HOME_ROUTE}><Button>Назад</Button></Link>
                </div>
            </Container>
            <Container style={{textAlign: 'center'}}>
                <Logo/>
                <div style={{paddingBottom: 50, fontSize: 18,
                    paddingTop: 40}}>Выполните поиск ТРЕК кода по ФИО</div>
                <input placeholder="Введите ФИО*" style={{marginBottom: 50}} className="field" value={fio} onChange={(e) => setFio(e.target.value)}/>
                <Button className="pay-btn" onClick={handleClick}>Поиск</Button>
            </Container>
        </>
    );
};

export default TrackSearch;