import { useState, useRef } from 'react';
import './UploadScreen.css';

const UploadScreen = ({ onFileUpload, isLoading }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        console.log('[UploadScreen] File dropped');
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        console.log('[UploadScreen] Dropped files count:', files?.length);
        if (files && files.length > 0) {
            handleFileSelection(files[0]);
        }
    };

    const handleFileSelection = (file) => {
        console.log('[UploadScreen] File selected:', {
            name: file.name,
            type: file.type,
            size: file.size
        });
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

        if (validTypes.includes(file.type)) {
            console.log('[UploadScreen] ✓ File type is valid');
            setSelectedFile(file);
        } else {
            console.error('[UploadScreen] ✗ Invalid file type:', file.type);
            alert('Please upload a valid file (PDF, JPEG, PNG)');
        }
    };

    const handleFileInputChange = (e) => {
        console.log('[UploadScreen] File input changed');
        if (e.target.files && e.target.files.length > 0) {
            console.log('[UploadScreen] Files from input:', e.target.files.length);
            handleFileSelection(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        console.log('[UploadScreen] Upload button clicked');
        if (selectedFile) {
            console.log('[UploadScreen] Calling onFileUpload with file:', selectedFile.name);
            onFileUpload(selectedFile);
        } else {
            console.warn('[UploadScreen] No file selected');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="upload-screen fade-in">
            <div className="glass-card upload-container">
                {/* Header */}
                <div className="upload-header">
                    <div className="icon-wrapper">
                        <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="upload-title">Upload Your Prescription</h1>
                    <p className="upload-subtitle">
                        Get your medicines delivered quickly and safely
                    </p>
                </div>

                {/* Upload Area */}
                <div
                    className={`upload-area ${isDragging ? 'dragging' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                    />

                    {!selectedFile ? (
                        <div className="upload-placeholder">
                            <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <h3 className="upload-text">Drop your prescription here</h3>
                            <p className="upload-hint">or click to browse</p>
                            <div className="supported-formats">
                                <span className="badge badge-info">PDF</span>
                                <span className="badge badge-info">JPEG</span>
                                <span className="badge badge-info">PNG</span>
                            </div>
                        </div>
                    ) : (
                        <div className="file-preview">
                            <div className="file-icon">
                                {selectedFile.type === 'application/pdf' ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>
                            <div className="file-info">
                                <h4 className="file-name">{selectedFile.name}</h4>
                                <p className="file-size">{formatFileSize(selectedFile.size)}</p>
                            </div>
                            <button
                                className="remove-file-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFile(null);
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Upload Button */}
                {selectedFile && (
                    <button
                        className="btn btn-primary upload-btn slide-in-right"
                        onClick={handleUpload}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Upload Prescription
                            </>
                        )}
                    </button>
                )}

                {/* Features */}
                <div className="features-grid">
                    <div className="feature-item">
                        <div className="feature-icon" style={{ background: 'linear-gradient(135deg, var(--pastel-mint) 0%, #A8E6C1 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h4>Secure & Private</h4>
                        <p>Your data is encrypted</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon" style={{ background: 'linear-gradient(135deg, var(--pastel-blue) 0%, #A8D8F0 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h4>Fast Processing</h4>
                        <p>Instant verification</p>
                    </div>

                    <div className="feature-item">
                        <div className="feature-icon" style={{ background: 'linear-gradient(135deg, var(--pastel-pink) 0%, #FFB3D1 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4>24/7 Available</h4>
                        <p>Order anytime</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadScreen;
