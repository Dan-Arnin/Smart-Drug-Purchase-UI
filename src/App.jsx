import { useState } from 'react';
import './App.css';
import UploadScreen from './components/UploadScreen';
import PrescriptionDetails from './components/PrescriptionDetails';
import ChatInterface from './components/ChatInterface';

function App() {
  const [currentView, setCurrentView] = useState('upload'); // upload, details, chat
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [safetyData, setSafetyData] = useState(null);
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
        console.log('✓ Prescription data set');

        // Prepare payloads for parallel API calls
        const verifyPayload = {
          doctor_name: data.data.doctor_info.doctor_name,
          registration_number: data.data.doctor_info.registration_number,
          medical_council: "",
        };

        const medicineNames = data.data.medicines.map(med => med.medicine_name);
        const safetyPayload = {
          medicines: medicineNames
        };

        console.log('=== PARALLEL CHECKS STARTED ===');
        console.log('Doctor verification payload:', verifyPayload);
        console.log('Medicine safety payload:', safetyPayload);

        const verifyUrl = 'http://localhost:8000/api/v1/verify-doctor';
        const safetyUrl = 'http://localhost:8000/api/v1/check-medicine-safety';

        // Run both API calls in parallel
        const [verifyResponse, safetyResponse] = await Promise.all([
          fetch(verifyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(verifyPayload),
          }),
          fetch(safetyUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(safetyPayload),
          })
        ]);

        console.log('Verify response status:', verifyResponse.status);
        console.log('Safety response status:', safetyResponse.status);

        const [verifyData, safetyDataResponse] = await Promise.all([
          verifyResponse.json(),
          safetyResponse.json()
        ]);

        console.log('Verify response data:', verifyData);
        console.log('Safety response data:', safetyDataResponse);

        setVerificationData(verifyData);
        setSafetyData(safetyDataResponse);
        console.log('✓ Verification and safety checks complete');

        // Filter out unsafe medicines
        if (safetyDataResponse.success && safetyDataResponse.results) {
          const safeMedicines = data.data.medicines.filter(medicine => {
            const safetyResult = safetyDataResponse.results.find(
              result => result.medicine_name === medicine.medicine_name
            );
            return safetyResult && !safetyResult.flagged;
          });

          const unsafeMedicines = data.data.medicines.filter(medicine => {
            const safetyResult = safetyDataResponse.results.find(
              result => result.medicine_name === medicine.medicine_name
            );
            return safetyResult && safetyResult.flagged;
          });

          console.log('Safe medicines:', safeMedicines);
          console.log('Unsafe medicines (filtered out):', unsafeMedicines);

          // Update prescription data with only safe medicines
          const updatedPrescriptionData = {
            ...data.data,
            medicines: safeMedicines,
            originalMedicines: data.data.medicines // Keep original for reference
          };

          setPrescriptionData(updatedPrescriptionData);
        } else {
          // If safety check fails, use all medicines
          console.warn('Safety check failed or no results, showing all medicines');
          setPrescriptionData(data.data);
        }

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
    setSafetyData(null);
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
          safetyData={safetyData}
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
