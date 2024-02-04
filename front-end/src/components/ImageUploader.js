// ImageUploader.js
import React, { useState } from 'react';
import axios from 'axios';
import './ImageUploader.css';

const ImageUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [filesWithNumber, setFilesWithNumber] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            setPrediction(response.data.prediction);
            setFilesWithNumber(response.data.files);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="container">
            <label className="file-input-wrapper">
                <span className="file-input-button">Choose a file</span>
                <input type="file" accept=".jpg, .jpeg, .png" className="file-input" onChange={handleFileChange} />
            </label>
            <button className="upload-button" onClick={handleUpload}>
                Upload
            </button>

            {prediction !== null && (
                <div className="result-container">
                    <p>Prediction: {prediction}</p>
                    <p>Files with the same number: {filesWithNumber.join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
