import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Lightbox from "react-lightbox-component";
import Post from "./Post";

const Posts = () => {

    const {store} = useContext(Context);
    const [posts, setPosts] = useState([]);
    const images = posts.map(post => {
        return {
            src: post.image,
            title: '#' + post.articul,
            description: post.price + '₽',
            id: post._id,
        }
    })

    useEffect(() => {
        store.getPosts().then(posts => setPosts(posts));
    }, []);

    return (
        <>
            <h2>Инстаграмм посты</h2>
            <div className="posts" style={{padding: '10px 0'}}>
                <Lightbox
                    images={images}
                    renderImageFunc={(idx, image, toggleLightbox, width, height) => {
                        return (
                            <Post key={idx} image={image.src} id={image.id} price={image.description} articul={image.title} style={{width: width, height: height}}
                                  onClick={toggleLightbox.bind(null, idx)}/>
                        )
                    }}
                />
            </div>
        </>
    );
};

export default observer(Posts);