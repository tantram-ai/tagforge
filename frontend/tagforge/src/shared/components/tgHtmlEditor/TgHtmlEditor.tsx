import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Quill } from 'react-quill-new'
import BlotFormatter from '@enzedonline/quill-blot-formatter2';
Quill.register('modules/blotFormatter', BlotFormatter);



// Toolbar, modules, and formats as above

const toolbarOptions = [
    [{ 'font': [] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['table'],
    ['clean']
];

const modules = {
    toolbar: toolbarOptions,
    clipboard: {
        matchVisual: false,
    },
    blotFormatter: {}
};

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent', 'align', 'color', 'background',
    'script',
    'link', 'image', 'video',
    'clean'
];


type Props = {
    initialHtml: string;
    value: any;
    setValue: any;
    editorRef: any
};

export const TgHtmlEditor: React.FC<Props> = ({ editorRef, value, setValue, initialHtml }) => {


    useEffect(() => {
        setValue(initialHtml);
    }, [initialHtml]);


    return (
        <div>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
            />
            <div
                ref={editorRef}
                style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
                dangerouslySetInnerHTML={{ __html: value }}
            />

        </div>
    );
};
