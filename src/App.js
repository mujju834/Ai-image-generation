import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function App() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState([]); // Array to store multiple images
  const [loading, setLoading] = useState(false); // Loading state

  const handleGenerate = async () => {
    if (!prompt) {
      alert('Please enter a prompt!');
      return;
    }

    setLoading(true); // Show loader
    setImages([]); // Clear previous images

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate-image`, // Use .env variable
        { prompt }
      );

      console.log('API Response:', response.data); // Debugging: Log the response

      // Check if the backend returned 'images' array
      if (response.data && response.data.images && response.data.images.length > 0) {
        setImages(response.data.images); // Set the array of images
      } else {
        alert('No images returned. Please try again.');
      }
    } catch (error) {
      console.error('Error generating images:', error);
      alert('Failed to generate images. Please try again.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="container py-5 text-center">
      {/* Header */}
      <h1 className="mb-4 display-4 fw-bold text-primary">Mujju-AI-Image-Generation App</h1>

      {/* Prompt Note */}
      <div className="mb-4">
        <p className="text-muted fs-5 text-center mx-auto" style={{ maxWidth: '700px' }}>
          <em>
            Enter a descriptive prompt to generate images. For example:{' '}
            <span className="fw-bold">"give me an image which shows animals swimming in water"</span>
          </em>
        </p>
      </div>

      {/* Input Group */}
      <div className="input-group mb-4 justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="btn btn-primary px-4" onClick={handleGenerate}>
          Generate Image
        </button>
      </div>

      {/* Processing Spinner */}
      {loading && (
        <div className="my-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
          <div className="spinner-border text-secondary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
          <div className="spinner-border text-success" style={{ width: '3rem', height: '3rem' }} role="status"></div>
          <p className="mt-3 fs-5 fw-bold text-info">
            Our AI is working hard to bring your imagination to life... ⏳
          </p>
        </div>
      )}

      {/* Generated Images */}
      {!loading && images.length > 0 && (
        <div>
          <h3 className="mb-4 text-success fw-bold">Generated Images:</h3>
          <div className="row g-4 justify-content-center">
            {images.map((imgSrc, index) => (
              <div key={index} className="col-md-4 col-sm-6 col-12">
                <div className="card shadow-sm border-0">
                  <img
                    src={imgSrc}
                    alt={`Generated ${index + 1}`}
                    className="card-img-top"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <a
                      href={imgSrc}
                      download={`generated-image-${index + 1}.png`}
                      className="btn btn-success btn-sm w-100"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
