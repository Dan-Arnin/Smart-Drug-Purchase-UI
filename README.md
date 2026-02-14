# MediCare - Smart Prescription & Medicine Delivery Platform

## 🎨 Overview
A modern, sleek, and highly interactive frontend for a medicine buying platform with beautiful pastel colors, glassmorphism effects, and smooth animations.

## ✨ Features

### 1. **Upload Screen**
- Drag-and-drop file upload
- Support for PDF, JPEG, and PNG files
- Beautiful file preview
- Real-time validation
- Animated loading states

### 2. **Prescription Details View**
- Doctor verification status with visual indicators
- **Medicine safety check** - automatically filters unsafe medicines
- Visual warnings for flagged medicines
- Patient information display
- Detailed medicine list with dosage instructions (safe medicines only)
- Smooth transitions and animations
- Responsive design

### 3. **AI Pharmacist Chat**
- Interactive chat interface
- Sidebar with prescription summary
- Quick question buttons
- Typing indicators
- Real-time message display

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Backend API running on `http://localhost:8000`

### Installation
```bash
npm install
```

### Running the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 API Endpoints

### 1. Upload Prescription
**Endpoint:** `POST http://localhost:8000/api/v1/upload-prescription`

**Request:**
```bash
curl --location 'http://localhost:8000/api/v1/upload-prescription' \
--form 'file=@"/path/to/prescription.jpg"'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "doctor_info": {
      "hospital_name": "DEEPAN HOSPITAL",
      "doctor_name": "Dr. JOSEPH.C.MATHURAM, MBBS.,(ORTHO)",
      "registration_number": "28564"
    },
    "patient_info": {
      "name": "Mrs. AKILA NITHIYAKUMAR",
      "age": "56Y 169 Days",
      "patient_id": "DH73555",
      "date": "05-12-2024"
    },
    "medicines": [...]
  }
}
```

### 2. Verify Doctor
**Endpoint:** `POST http://localhost:8000/api/v1/verify-doctor`

**Request:**
```json
{
  "doctor_name": "Dr. JOSEPH.C.MATHURAM, MBBS.,(ORTHO)",
  "registration_number": "28564",
  "medical_council": ""
}
```

**Response:**
```json
{
  "verified": true,
  "reason": "Doctor verified with 37.9% name match",
  "best_match": {
    "registration_number": "28564",
    "medical_council": "Tamil Nadu Medical Council",
    "doctor_name": "Mathuram Kjoseph Chinnadurai"
  }
}
```

### 3. Check Medicine Safety
**Endpoint:** `POST http://localhost:8000/api/v1/check-medicine-safety`

**Request:**
```json
{
  "medicines": [
    "Paracetamol",
    "Alprazolam",
    "Codeine"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "medicine_name": "Paracetamol",
      "flagged": false
    },
    {
      "medicine_name": "Alprazolam",
      "flagged": true
    },
    {
      "medicine_name": "Codeine",
      "flagged": true
    }
  ],
  "error": null
}
```

**Note:** The application automatically filters out medicines flagged as unsafe and displays them to the user with a warning.

## 📝 Console Logging

The application now includes comprehensive logging at every step:

### Upload Process Logs
- `[UploadScreen]` - File selection and validation
- `=== UPLOAD STARTED ===` - Upload initiation
- `✓ FormData created` - Form data preparation
- `Upload response status` - API response status
- `✓ Upload successful` - Successful upload
- `=== PARALLEL CHECKS STARTED ===` - Doctor verification and medicine safety check
- `Doctor verification payload` - Verification request data
- `Medicine safety payload` - Safety check request data
- `Verify response status` - Doctor verification response
- `Safety response status` - Medicine safety response
- `✓ Verification and safety checks complete` - Both checks completed
- `Safe medicines` - List of safe medicines
- `Unsafe medicines (filtered out)` - List of flagged medicines
- `✓ Switched to details view` - Navigation to details
- `=== UPLOAD PROCESS COMPLETE ===` - End of process

### Error Logs
- `=== ERROR IN UPLOAD PROCESS ===` - Error details
- Error type, message, and stack trace

### Chat Logs
- `[ChatInterface]` - Message sending and receiving

## 🎨 Design System

### Color Palette
- **Primary:** Purple tones (#9B7EBD)
- **Accent Blue:** #6BA3D4
- **Accent Pink:** #F4A6C8
- **Accent Mint:** #7FD99A
- **Pastel Background:** Gradient of lavender, blue, and mint

### Key Features
- Glassmorphism effects with backdrop blur
- Smooth animations and transitions
- Responsive design for all screen sizes
- Modern typography (Inter font)
- Custom scrollbars
- Hover effects and micro-animations

## 🐛 Debugging

### Common Issues

1. **ERR_ADDRESS_INVALID**
   - **Fixed:** Changed API URL from `0.0.0.0` to `localhost`
   - Check console logs for detailed error information

2. **CORS Issues**
   - Ensure backend has CORS enabled for `http://localhost:5173`

3. **File Upload Fails**
   - Check file type (must be PDF, JPEG, or PNG)
   - Check file size
   - Review console logs for detailed error messages

### Viewing Logs
Open browser DevTools (F12) and check the Console tab for detailed logs at every step.

## 📁 Project Structure

```
src/
├── App.jsx                          # Main app component with routing
├── App.css                          # App-specific styles
├── index.css                        # Global design system
├── main.jsx                         # Entry point
└── components/
    ├── UploadScreen.jsx            # File upload interface
    ├── UploadScreen.css
    ├── PrescriptionDetails.jsx     # Prescription display
    ├── PrescriptionDetails.css
    ├── ChatInterface.jsx           # AI chat interface
    └── ChatInterface.css
```

## 🔄 User Flow

1. **Upload Prescription**
   - User uploads prescription file (PDF/JPEG/PNG)
   - File is validated and sent to API
   - Loading indicator shows progress

2. **Parallel Verification & Safety Checks**
   - Doctor verification runs in parallel with medicine safety check
   - Both API calls complete simultaneously for faster processing
   - Unsafe medicines are automatically filtered out

3. **View Details**
   - Doctor verification status displayed
   - Medicine safety check results shown
   - Warning displayed if any medicines were flagged as unsafe
   - Patient information shown
   - Safe medicine list with dosage details
   - Option to chat with AI pharmacist

4. **Chat with AI**
   - Sidebar shows prescription summary (safe medicines only)
   - Main chat area for interaction
   - Quick question buttons for common queries
   - Real-time message exchange

## 🎯 Next Steps

1. **Connect Real AI API**
   - Replace simulated chat responses with actual AI pharmacist API
   - Add medicine information lookup
   - Implement side effects checking

2. **Add Features**
   - Order placement
   - Payment integration
   - Order tracking
   - Medicine search

3. **Enhancements**
   - Add animations for state transitions
   - Implement error boundaries
   - Add loading skeletons
   - Optimize performance

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎨 Customization

### Changing Colors
Edit `src/index.css` and modify CSS variables:
```css
:root {
  --primary: #9B7EBD;
  --accent-blue: #6BA3D4;
  /* ... other colors */
}
```

### Modifying Animations
All animations are defined in `src/index.css` under the `@keyframes` section.

## 📄 License

This project is created for the Cerebral Valley Hackathon.

---

**Built with ❤️ using React + Vite**
