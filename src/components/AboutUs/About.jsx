// import React, { useState } from 'react'
// import UploadImage from '../UploadImage/UploadImage'
// import ImageCropper from '../UploadImage/ImageCropper';

// const About = () => {
//   const [image, setImage] = useState("");
//   const [currentPage, setCurrentPage] = useState("choose-img");

//   //Callback func when img is selected
//   const onImageSelected = (selectedImg) => {
//     setImage(selectedImg);
//     setCurrentPage("crop-img");
//   }

//   //Callback func when cropping is done
//   const onCropDone = (imgCroppedArea) => {}

//   //Callback func when cropping is canceled
//   const onCropCancel = () => {}

//   return (

//     <div className='container'>
//       {currentPage === "choose-img" ? (
//         <UploadImage onImageSelected={onImageSelected} />
//       ) : currentPage === "crop-img" ? (
//         <ImageCropper
//           image={image}
//           onCropDone={onCropDone}
//           onCropCancel={onCropCancel}
//         />

//       ) : (
//         <div></div>
//       )}
//     </div>

//   );
// };
// export default About;

import React, { useState } from "react";
import UploadImage from "../UploadImage/UploadImage";

const About = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleUploadComplete = (url) => {
    setImageUrl(url);
  };

  const handleUserId = () => {
    
  }
 
  return (
    <div>
      <UploadImage
        aspectRatio={3/2}
        onUploadComplete={handleUploadComplete}
        maxWidth={10000}
        maxHeight={10000}
        minWidth={300}
        minHeight={300}
      />
      {imageUrl && <div>{/* <p>Image URL: {imageUrl}</p> */}</div>}
    </div>
  );
};

export default About;


