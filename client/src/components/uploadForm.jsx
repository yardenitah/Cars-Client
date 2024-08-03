// client/src/components/UploadForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import apiBaseUrl from '../constants';

const UploadForm = ({ setImg }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post(`${apiBaseUrl}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImg(data.filePath); // Assuming the server returns the file path in 'data.filePath'
      alert('File uploaded successfully');
    } catch (error) {
      alert('Error uploading file');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;