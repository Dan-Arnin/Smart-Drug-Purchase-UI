import { useState } from 'react';
import './App.css';
import UploadScreen from './components/UploadScreen';
import PrescriptionDetails from './components/PrescriptionDetails';
import ChatInterface from './components/ChatInterface';

function App() {
  const [currentView, setCurrentView] = useState('upload'); // upload, details, chat
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file) => {
    console.log('=== UPLOAD STARTED ===');
    console.log('File to upload:', {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: new Date(file.lastModified).toISOString()
    });

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log('✓ FormData created with file');

      const uploadUrl = 'http://localhost:8000/api/v1/upload-prescription';
      console.log('Uploading to:', uploadUrl);

      const response = await fetch('http://localhost:8000/api/v1/upload-prescription', {
        method: 'POST',
        body: formData,
      });

      console.log('Upload response status:', response.status);
      console.log('Upload response ok:', response.ok);

      const data = await response.json();
      console.log('Upload response data:', data);

      if (data.success) {
        console.log('✓ Upload successful');
        setPrescriptionData(data.data);
        console.log('✓ Prescription data set');

        // Verify doctor
        const verifyPayload = {
          doctor_name: data.data.doctor_info.doctor_name,
          registration_number: data.data.doctor_info.registration_number,
          medical_council: "",
        };
        console.log('=== DOCTOR VERIFICATION STARTED ===');
        console.log('Verification payload:', verifyPayload);

        const verifyUrl = 'http://localhost:8000/api/v1/verify-doctor';
        console.log('Verifying at:', verifyUrl);

        const verifyResponse = await fetch(verifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(verifyPayload),
        });

        console.log('Verify response status:', verifyResponse.status);
        console.log('Verify response ok:', verifyResponse.ok);

        const verifyData = await verifyResponse.json();
        console.log('Verify response data:', verifyData);

        setVerificationData(verifyData);
        console.log('✓ Verification complete');

        setCurrentView('details');
        console.log('✓ Switched to details view');
        console.log('=== UPLOAD PROCESS COMPLETE ===');
      } else {
        console.error('✗ Upload failed - success flag is false');
        console.error('Error from API:', data.error);
        alert(`Upload failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('=== ERROR IN UPLOAD PROCESS ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      alert('Failed to upload prescription. Please try again. Check console for details.');
    } finally {
      setIsLoading(false);
      console.log('Loading state set to false');
    }
  };

  const handleStartChat = () => {
    setCurrentView('chat');
  };

  const handleBackToUpload = () => {
    setCurrentView('upload');
    setPrescriptionData(null);
    setVerificationData(null);
  };

  return (
    <div className="app">
      {currentView === 'upload' && (
        <UploadScreen onFileUpload={handleFileUpload} isLoading={isLoading} />
      )}

      {currentView === 'details' && prescriptionData && (
        <PrescriptionDetails
          prescriptionData={prescriptionData}
          verificationData={verificationData}
          onStartChat={handleStartChat}
          onBack={handleBackToUpload}
        />
      )}

      {currentView === 'chat' && prescriptionData && (
        <ChatInterface
          prescriptionData={prescriptionData}
          onBack={() => setCurrentView('details')}
        />
      )}
    </div>
  );
}

export default App;
