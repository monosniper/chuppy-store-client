import React, {useContext, useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import {Context} from "../../index";
import Button from "../Button";
import Noty from 'noty';
import { FileDrop } from 'react-file-drop'

const ChangeGuarantiesPage = (props) => {
    const {store} = useContext(Context);
    const name = 'delivery';
    const [editorHtml, setEditorHtml] = useState('');
    const [theme, setTheme] = useState('snow');
    const fileInputRef = useRef(null);

    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'},
                {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const save = () => {
        store.setContent(name, editorHtml).then(rs => {
            new Noty({
                type: 'success',
                text: "Сохранено"
            }).show();
        });
    }

    const onTargetClick = () => {
        fileInputRef.current.click()
    }

    const onFileInputChange = (event) => {
        function renameFile(originalFile, newName) {
            return new File([originalFile], newName, {
                type: originalFile.type,
                lastModified: originalFile.lastModified,
            });
        }

        const { files } = event.target;

        const filesToUpload = [...files].map(file => {
            return {
                file: renameFile(file, 'guaranties.pdf'), dir: '.'
            }
        });
        console.log(filesToUpload, files)
        store.uploadFiles(filesToUpload, true);
    }

    useEffect(() => {
        store.getContent(name).then(rs => setEditorHtml(rs.data.content))
    }, []);

    return (
        <div style={{padding: '20px 0'}}>
            <ReactQuill
                theme={theme}
                onChange={setEditorHtml}
                value={editorHtml}
                modules={modules}
                formats={formats}
                bounds={'.app'}
                placeholder={props.placeholder}
            />

            <Button style={{margin: '15px auto'}} onClick={save}>Сохранить</Button>
        </div>
    );
};

export default ChangeGuarantiesPage;