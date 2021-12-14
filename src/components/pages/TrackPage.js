import React from 'react';
import Container from "../layout/Container";
import {Link, useNavigate} from "react-router-dom";
import {HOME_ROUTE, TRACK_RESULT_ROUTE, TRACK_SEARCH_ROUTE} from "../../utils/routes";
import Button from "../Button";
import Logo from "../Logo";

const TrackPage = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(TRACK_SEARCH_ROUTE);
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
                <div className="empty-result">
                    ПОИСК НЕ ДАЛ РЕЗУЛЬТАТОВ
                </div>
                <small style={{margin: '50px 0', display: 'block'}}>
                    *Если поиск не дал результатов, возможно информация в
                    базе данных не обновилась. Попробуйте после 00 :00
                </small>
                <Button className="pay-btn" onClick={handleClick}>Повторить</Button>
            </Container>
        </>
    );
};

export default TrackPage;