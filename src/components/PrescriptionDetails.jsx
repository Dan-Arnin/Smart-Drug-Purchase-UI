import './PrescriptionDetails.css';

const PrescriptionDetails = ({ prescriptionData, verificationData, safetyData, onStartChat, onBack }) => {
    const { doctor_info, patient_info, medicines, originalMedicines } = prescriptionData;

    // Get unsafe medicines that were filtered out
    const unsafeMedicines = safetyData?.results?.filter(result => result.flagged) || [];
    const hasUnsafeMedicines = unsafeMedicines.length > 0;

    return (
        <div className="prescription-details fade-in">
            <div className="glass-card details-container">
                {/* Header */}
                <div className="details-header">
                    <button className="back-btn" onClick={onBack}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    <h1 className="details-title">Prescription Details</h1>
                    <p className="details-subtitle">Review your prescription information</p>
                </div>

                {/* Doctor Verification */}
                {verificationData && (
                    <div className={`verification-card ${verificationData.verified ? 'verified' : 'not-verified'}`}>
                        <div className="verification-icon">
                            {verificationData.verified ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                        </div>
                        <div className="verification-content">
                            <h3 className="verification-title">
                                {verificationData.verified ? 'Doctor Verified ✓' : 'Verification Failed'}
                            </h3>
                            <p className="verification-reason">{verificationData.reason}</p>
                            {verificationData.verified && verificationData.best_match && (
                                <div className="best-match">
                                    <p><strong>Medical Council:</strong> {verificationData.best_match.medical_council}</p>
                                    <p><strong>Registration Year:</strong> {verificationData.best_match.registration_year}</p>
                                    <p><strong>Match Score:</strong> {(verificationData.best_match.name_similarity * 100).toFixed(1)}%</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Medicine Safety Check */}
                {safetyData && safetyData.success && (
                    <div className={`safety-card ${hasUnsafeMedicines ? 'has-unsafe' : 'all-safe'}`}>
                        <div className="safety-icon">
                            {hasUnsafeMedicines ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            )}
                        </div>
                        <div className="safety-content">
                            <h3 className="safety-title">
                                {hasUnsafeMedicines ? 'Safety Check: Unsafe Medicines Detected' : 'Safety Check: All Medicines Safe ✓'}
                            </h3>
                            {hasUnsafeMedicines ? (
                                <>
                                    <p className="safety-reason">
                                        {unsafeMedicines.length} medicine{unsafeMedicines.length > 1 ? 's were' : ' was'} flagged as potentially unsafe and removed from your prescription.
                                    </p>
                                    <div className="unsafe-medicines-list">
                                        <p className="unsafe-label"><strong>Removed Medicines:</strong></p>
                                        <ul>
                                            {unsafeMedicines.map((med, index) => (
                                                <li key={index} className="unsafe-medicine-item">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    {med.medicine_name}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="safety-note">Please consult with your doctor about alternative medicines.</p>
                                    </div>
                                </>
                            ) : (
                                <p className="safety-reason">All prescribed medicines have passed safety checks.</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Doctor Info */}
                <div className="info-section slide-in-left">
                    <div className="section-header">
                        <div className="section-icon" style={{ background: 'linear-gradient(135deg, var(--pastel-blue) 0%, #A8D8F0 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2>Doctor Information</h2>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Name</span>
                            <span className="info-value">{doctor_info.doctor_name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Registration Number</span>
                            <span className="info-value">{doctor_info.registration_number}</span>
                        </div>
                        {doctor_info.hospital_name && (
                            <div className="info-item">
                                <span className="info-label">Hospital</span>
                                <span className="info-value">{doctor_info.hospital_name}</span>
                            </div>
                        )}
                        {doctor_info.hospital_address && (
                            <div className="info-item">
                                <span className="info-label">Address</span>
                                <span className="info-value">{doctor_info.hospital_address}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Patient Info */}
                <div className="info-section slide-in-right">
                    <div className="section-header">
                        <div className="section-icon" style={{ background: 'linear-gradient(135deg, var(--pastel-pink) 0%, #FFB3D1 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2>Patient Information</h2>
                    </div>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Name</span>
                            <span className="info-value">{patient_info.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Age</span>
                            <span className="info-value">{patient_info.age}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Patient ID</span>
                            <span className="info-value">{patient_info.patient_id}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Date</span>
                            <span className="info-value">{patient_info.date}</span>
                        </div>
                    </div>
                </div>

                {/* Medicines */}
                <div className="medicines-section">
                    <div className="section-header">
                        <div className="section-icon" style={{ background: 'linear-gradient(135deg, var(--pastel-mint) 0%, #A8E6C1 100%)' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <h2>Prescribed Medicines</h2>
                    </div>
                    <div className="medicines-list">
                        {medicines.map((medicine, index) => (
                            <div key={index} className="medicine-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="medicine-header">
                                    <h3 className="medicine-name">{medicine.medicine_name}</h3>
                                    {medicine.dosage !== "Not specified" && (
                                        <span className="badge badge-info">{medicine.dosage}</span>
                                    )}
                                </div>
                                <div className="medicine-details">
                                    {medicine.dosage_instruction !== "Not specified" && (
                                        <div className="medicine-detail-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <span><strong>Dosage:</strong> {medicine.dosage_instruction}</span>
                                        </div>
                                    )}
                                    {medicine.timing !== "Not specified" && (
                                        <div className="medicine-detail-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span><strong>Timing:</strong> {medicine.timing}</span>
                                        </div>
                                    )}
                                    {medicine.duration !== "Not specified" && (
                                        <div className="medicine-detail-item">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span><strong>Duration:</strong> {medicine.duration}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <button className="btn btn-primary chat-btn" onClick={onStartChat}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Chat with AI Pharmacist
                </button>
            </div>
        </div>
    );
};

export default PrescriptionDetails;
