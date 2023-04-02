import { useState, useEffect } from 'react';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

import './editor.scss'

const Editor = () => {

    function MyComponent() {

        const modules = {
            toolbar: [
                [{ 'header': [1, 2,3, false] }],
                ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image']
            ],
        }

        const formats = [
            'header',
            'bold', 'italic', 'underline', 'blockquote', 'code',
            'list', 'bullet', 'indent',
            'link', 'image', 'code-block'
        ]

        const [value, setValue] = useState('');

        
        return <ReactQuill
            theme="snow"
            value={value}
            modules={modules}
            formats={formats}
            onChange={setValue}
            className={'editor'}
        />;
    }

    return (
        <>
            <MyComponent 
                content = {value}
            />
        </>
    )
}

export default Editor