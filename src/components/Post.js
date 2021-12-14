import React from 'react';
import {AiFillDelete, FiEdit} from "react-icons/all";

const Post = (props) => {
    return (
        <div {...props} className="post" style={{backgroundImage: `url(${props.image})`}}>
            <div className="post-price">{props.price}</div>
            <div className="post-articul">{props.articul}</div>
            {props.handleEdit && (
                <div className="post-toolbar">
                    <div className="post-edit" onClick={() => props.handleEdit(props.id)}>
                        <FiEdit />
                    </div>
                    <div className="post-delete" onClick={() => props.handleDelete(props.id)}>
                        <AiFillDelete/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;