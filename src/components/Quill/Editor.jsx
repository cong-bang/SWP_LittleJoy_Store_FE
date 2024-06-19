import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Function to resize image using canvas
const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const maxWidth = 1024;
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          resolve(blob);
        }, file.type, 1);
      };
      img.onerror = (error) => reject(error);
      img.src = event.target.result;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Function to upload image to Firebase Storage and return the download URL
const uploadImageToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        resolve(url);
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

// Custom Image Handler
const imageHandler = function() {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      try {
        let resizedFile = file;
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
          if (img.width > 1024) {
            resizedFile = await resizeImage(file);
          }
          const imageUrl = await uploadImageToFirebase(resizedFile);
          const range = this.quill.getSelection();
          const imgTag = `<img src="${imageUrl}" style="display: block; margin: 0 auto; width: 50%;" />`;
          this.quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
        };
      } catch (error) {
        console.error('Error uploading image: ', error);
      }
    }
  };
};

// Add imageHandler to Quill's toolbar
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
