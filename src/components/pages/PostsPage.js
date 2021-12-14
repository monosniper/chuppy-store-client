import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import Noty from "noty";
import ReactQuill from "react-quill";
import Button from "../Button";
import swal from 'sweetalert';
import {observer} from "mobx-react-lite";
import {AiFillDelete, AiFillEdit, MdModeEditOutline} from "react-icons/all";
import Swal from 'sweetalert2'
import Post from "../Post";
import Lightbox from 'react-lightbox-component';

const PostsPage = () => {
    const {store} = useContext(Context);
    const [posts, setPosts] = useState([]);
    const images = posts.map(post => {
        return {
            src: process.env.REACT_APP_API_URL + '/posts/' + post.image,
            title: '#' + post.articul,
            description: post.price + '₽',
            id: post._id,
        }
    })

    const handleCreate = () => {
        swal({
            text: "Артикул товара:",
            content: 'input',
        }).then(articul => {
            if(articul !== '') {
                swal({
                    text: "Цена товара (₽):",
                    content: 'input',
                }).then(price => {
                    if(price !== '') {
                        Swal.fire({
                            text: "Выберите картинку:",
                            input: 'file',
                            inputAttributes: {
                                'accept': 'image/*',
                                'aria-label': 'Upload your profile picture'
                            }
                        }).then(rs => {
                            if(rs.value) {
                                store.uploadFiles([{
                                    file: rs.value, dir: 'posts'
                                }], false).then(() => {
                                    store.createPost({articul, price, image: rs.value.name}).then((post) => {
                                        swal('Отлично!', 'Пост создан успешно.', 'success');
                                        setPosts([...posts, post]);
                                    });
                                })
                            }
                        })
                    }
                })
            }
        });
    }

    const handleEdit = (id) => {
        store.getPost(id).then(post => {
            Swal.fire({
                html:
                    `<input id="articul" class="swal2-input" placeholder="Артикул: " value="${post.articul}">` +
                    `<input id="price" class="swal2-input" placeholder="Цена: "  value="${post.price}">`,
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        articul: document.getElementById('articul').value,
                        price: document.getElementById('price').value,
                    }
                }
            }).then(rs => {
                if(rs.value.articul !== '' && rs.value.price !== '') {
                    store.editPost(id, rs.value).then(() => {
                        swal('Готово', 'Пост был обновлен.', 'success')
                        const newProducts = [...posts].map(post => {
                            if(post._id === id) {
                                post.articul = rs.value.articul;
                                post.price = rs.value.price;
                            }
                            return post;
                        });
                        setPosts(newProducts);
                    });
                }
            })
        })
    }

    const handleDelete = (id) => {
        store.deletePost(id).then(() => {
            swal('Готово', 'Пост был удален.', 'success')
            const newPosts = [...posts].filter(post => post._id !== id);
            setPosts(newPosts);
        });
    }

    useEffect(() => {
        store.getPosts().then(rs => setPosts(rs))
    }, []);

    return (
        <div style={{padding: '20px 0'}}>
            <Button onClick={handleCreate}>Добавить пост</Button>
            <div className="posts">
                <Lightbox
                    images={images}
                    renderImageFunc={(idx, image, toggleLightbox, width, height) => {
                        console.log(image)
                        return (
                            <Post handleEdit={handleEdit} handleDelete={handleDelete} key={idx} image={image.src} id={image.id} price={image.description} articul={image.title} style={{width: width, height: height}}
                                  onClick={toggleLightbox.bind(null, idx)}/>
                        )
                    }}
                />
            </div>
        </div>
    );
};

export default observer(PostsPage);