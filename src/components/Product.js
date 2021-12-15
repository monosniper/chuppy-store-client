import React from 'react';
import {AiFillDelete, FiEdit} from "react-icons/all";

const Product = (props) => {

    const lang = {
        male: 'Муж',
        female: 'Жен',
        unisex: 'Уни',
    }

    return (
        <div className="post" style={{backgroundImage: `url(${props.product.image})`}}>
            <div className="post-filter">
                <div className="post-sizes">
                    {props.product.sizes.map(size => <div className="post-sizes-item">{size}</div>)}
                </div>
                <div className="post-sex">
                    {props.product.sex.map(sex => <div className="post-sizes-item">{lang[sex]}</div>)}
                </div>
            </div>
            <div className="post-price">{props.product.price}₽</div>
            <div className="post-articul">#{props.product.articul}</div>
            {props.handleEdit && (
                <div className="post-toolbar">
                    <div className="post-edit" onClick={() => props.handleEdit(props.product.id)}>
                        <FiEdit />
                    </div>
                    <div className="post-delete" onClick={() => props.handleDelete(props.product.id)}>
                        <AiFillDelete/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;