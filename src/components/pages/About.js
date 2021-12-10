import React, {useContext, useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Context} from "../../index";
import Container from "../layout/Container";
import Button from "../Button";
import {HOME_ROUTE} from "../../utils/routes";
import {Link} from "react-router-dom";

const About = () => {

    const {store} = useContext(Context);
    const [content, setContent] = useState('');

    useEffect(() => {
        store.getContent('about').then(rs => setContent(rs.data.content));
    }, []);

    return (
        <Container className='lg'>
            <Helmet>
                <title>О магазине | {process.env.REACT_APP_NAME}</title>
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

export default About;