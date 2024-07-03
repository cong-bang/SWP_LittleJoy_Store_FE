import React, { useState, useRef, useEffect } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./modal-upload.css";

const UploadImage = ({
  aspectRatio = 1,
  maxWidth = 1000,
  maxHeight = 1000,
  onUploadComplete,
  minWidth = 300,
  minHeight = 300,
}) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageRef = useRef(null);
  const cropperRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (imageRef.current && image) {
      cropperRef.current = new Cropper(imageRef.current, {
        aspectRatio,
        viewMode: 1,
        autoCropArea: 1,
        ready() {
          this.cropper.getCroppedCanvas().toBlob((blob) => {
            setCroppedImage(blob);
          });
        },
        crop(event) {
          this.cropper.getCroppedCanvas().toBlob((blob) => {
            setCroppedImage(blob);
          });
        },
        cropmove(event) {
          const cropBoxData = this.cropper.getCropBoxData();
          if (cropBoxData.width < minWidth) {
            this.cropper.setCropBoxData({
              left: cropBoxData.left,
              top: cropBoxData.top,
              width: minWidth,
            });
          }
          if (cropBoxData.height < minHeight) {
            this.cropper.setCropBoxData({
              left: cropBoxData.left,
              top: cropBoxData.top,
              height: minHeight,
            });
          }
        },
      });
    }
    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, [image, aspectRatio, minWidth, minHeight]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 3 * 1024 * 1024; // 3MB

      if (!validTypes.includes(file.type)) {
        setError("Chỉ cho phép file PNG và JPEG");
        return;
      }

      if (file.size > maxSize) {
        setError("Ảnh cần phải nhỏ hơn 3MB");
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          setError(
            `Ảnh cần có kích thước nhỏ hơn ${maxWidth}x${maxHeight} pixels`
          );
        } else if (img.width < minWidth || img.height < minHeight) {
          setError(
            `Ảnh cần có kích thước lớn hơn ${minWidth}x${minHeight} pixels`
          );
        } else {
          setError("");
          const reader = new FileReader();
          reader.onload = () => {
            setImage(reader.result);
            setIsModalOpen(true);
          };
          reader.readAsDataURL(file);
        }
      };
    }
  };

  const handleUpload = () => {
    if (croppedImage) {
      const storageRef = ref(storage, `images/${Date.now()}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, croppedImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              setIsModalOpen(false);
              if (onUploadComplete) {
                onUploadComplete(downloadURL);
              }
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
            });
        }
      );
    } else {
      console.log("No image selected");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setImage(null);
    setCroppedImage(null);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCancel();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="d-inline-block">
      <input
        type="file"
        onChange={handleImageChange}
        style={{ backgroundColor: "white", borderRadius: '5px' }}
        className="p-2 w-100"
        placeholder="Tải ảnh lên"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isModalOpen && (
        <div className="modal-upload">
          <div className="modal-upload-content p-4" ref={modalRef}>
            <img
              ref={imageRef}
              src={image}
              alt="Selected"
              style={{ maxWidth: 500, maxHeight: 500 }}
            />
            <button
              className="mt-3 px-3 py-1"
              style={{
                borderRadius: "5px",
                backgroundColor: "#005B96",
                color: "white",
                border: "none",
                marginRight: "10px",
              }}
              onClick={handleUpload}
            >
              Save
            </button>
            <button
              className="mt-3 px-3 py-1"
              style={{
                borderRadius: "5px",
                backgroundColor: "#d9534f",
                color: "white",
                border: "none",
              }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
