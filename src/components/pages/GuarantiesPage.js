import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import Container from "../layout/Container";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/routes";
import Button from "../Button";

const GuarantiesPage = () => {
    const {store} = useContext(Context);
    const [content, setContent] = useState('');
    const [documentVisible, setDocumentVisible] = useState(false);

    const toggleDocumentVisible = () => setDocumentVisible(!documentVisible);

    useEffect(() => {
        store.getContent('guaranties').then(rs => setContent(rs.data.content));
    }, []);

    return (
        <Container className='lg'>
            <Helmet>
                <title>Гарантии | {process.env.REACT_APP_NAME}</title>
            </Helmet>

            <div style={{padding: '40px 0'}}>
                <Link to={HOME_ROUTE}><Button>Назад</Button></Link>
            </div>

            <div dangerouslySetInnerHTML={{
                __html: content
            }} />

            <div style={{padding: '20px 0', textAlign: 'center'}}>
                <Button onClick={toggleDocumentVisible}>Развернуть документы ▼</Button>
            </div>

            <iframe style={{display: documentVisible ? 'block' : 'none',width: '100%', height: 800, margin: '40px 0'}} src='https://kompliroom.com/doc.pdf' />
        </Container>
    );
};

export default GuarantiesPage;