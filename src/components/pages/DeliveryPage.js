import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import Container from "../layout/Container";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/routes";
import Button from "../Button";

const DeliveryPage = () => {
    const {store} = useContext(Context);
    const [content, setContent] = useState('');

    useEffect(() => {
        store.getContent('delivery').then(rs => setContent(rs.data.content));
    }, []);

    return (
        <Container className='lg'>
            <Helmet>
                <title>Доставка | {process.env.REACT_APP_NAME}</title>
            </Helmet>

            <div style={{padding: '40px 0'}}>
                <Link to={HOME_ROUTE}><Button>Назад</Button></Link>
            </div>

            <div dangerouslySetInnerHTML={{
                __html: content
            }} />
        </Container>
    );
};

export default DeliveryPage;