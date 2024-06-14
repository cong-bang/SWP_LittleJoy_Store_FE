import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Hàm Xử Lý Ảnh Tùy Chỉnh
const imageHandler = function() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = () => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const range = this.quill.getSelection();
      const img = `<img src="${reader.result}" style="display: block; margin: 0 auto; max-width: 100%;" />`;
      this.quill.clipboard.dangerouslyPasteHTML(range.index, img);
    };

    reader.readAsDataURL(file);
  };
};

// Thêm hàm imageHandler vào thanh công cụ Quill
const modules = {
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']                                         
    ],
    handlers: {
      image: imageHandler
    }
  }
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

const Editor = ({ value, onChange }) => {
  return (
    <ReactQuill 
      value={value}
      onChange={onChange}
      style={{ backgroundColor: 'white', borderRadius: '5px', overflow: 'hidden' }}
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
