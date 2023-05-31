import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.scss'
import { BlogContext } from '../../context/BlogContext';



const Editor = () => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            [{ 'align': [] }]
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'blockquote', 'code',
        'list', 'bullet', 'indent',
        'link', 'code-block', 'align'
    ]

    const blogContext = useContext(BlogContext);

    const [value, setValue] = useState('');

    useEffect(() => {
        // console.log(value)    
        blogContext.updateVal(value);
    }, [value])

    return (
        <>
            <div className="editor">
                <ReactQuill
                    theme="snow"
                    value={value}
                    modules={modules}
                    formats={formats}
                    onChange={setValue}
                    className={'editor'}
                />
            </div>

        </>
    );
}

export default Editor