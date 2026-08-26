import React, { useRef, useState } from 'react';
import './ImageUploader.css';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

export default function ImageUploader({ onImageSelected, uploadedImage, onClear }) {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (onImageSelected) {
        onImageSelected(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="image-uploader-container">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {uploadedImage ? (
        <div className="upload-preview-card">
          <img src={uploadedImage} alt="Uploaded Digit" className="upload-preview-img" />
          <button className="remove-upload-btn" onClick={onClear} title="Remove image">
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`upload-dropzone ${isDragOver ? 'is-dragover' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon-wrapper">
            <UploadCloud size={24} />
          </div>
          <div className="upload-title">Drop your digit image here or click to browse</div>
          <div className="upload-subtitle">Supports PNG, JPG, JPEG, WebP (28x28 or larger)</div>
        </div>
      )}
    </div>
  );
}
