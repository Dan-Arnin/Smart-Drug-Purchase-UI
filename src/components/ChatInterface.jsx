import { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

const ChatInterface = ({ prescriptionData, onBack }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hello! I'm your AI Pharmacist. I've reviewed your prescription. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        console.log('[ChatInterface] Send message called');
        if (!inputValue.trim()) {
            console.log('[ChatInterface] Empty message, skipping');
            return;
        }

        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: inputValue,
            timestamp: new Date(),
        };

        console.log('[ChatInterface] User message:', userMessage);
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        console.log('[ChatInterface] Simulating AI response...');

        // Simulate AI response (replace with actual API call)
        setTimeout(() => {
            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: "I understand your question. Let me help you with that. This is a simulated response. In production, this would connect to your AI pharmacist API.",
                timestamp: new Date(),
            };
            console.log('[ChatInterface] Bot message:', botMessage);
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const quickQuestions = [
        "What are the side effects?",
        "Can I take these with food?",
        "What if I miss a dose?",
        "Are there any interactions?",
    ];

    return (
        <div className="chat-interface fade-in">
            {/* Sidebar */}
            <div className="chat-sidebar glass-card">
                <div className="sidebar-header">
                    <button className="back-btn-sidebar" onClick={onBack}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h3>Prescription</h3>
                </div>

                {/* Patient Info */}
                <div className="sidebar-section">
                    <div className="sidebar-section-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h4>Patient</h4>
                    </div>
                    <div className="patient-info">
                        <p className="patient-name">{prescriptionData.patient_info.name}</p>
                        <p className="patient-detail">Age: {prescriptionData.patient_info.age}</p>
                        <p className="patient-detail">ID: {prescriptionData.patient_info.patient_id}</p>
                    </div>
                </div>

                {/* Medicines List */}
                <div className="sidebar-section">
                    <div className="sidebar-section-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <h4>Medicines</h4>
                    </div>
                    <div className="medicines-sidebar-list">
                        {prescriptionData.medicines.map((medicine, index) => (
                            <div key={index} className="medicine-sidebar-item">
                                <div className="medicine-bullet"></div>
                                <div className="medicine-sidebar-content">
                                    <p className="medicine-sidebar-name">{medicine.medicine_name}</p>
                                    {medicine.dosage_instruction !== "Not specified" && (
                                        <p className="medicine-sidebar-dosage">{medicine.dosage_instruction}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="chat-main glass-card">
                <div className="chat-header">
                    <div className="chat-header-content">
                        <div className="bot-avatar">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="chat-title">AI Pharmacist</h2>
                            <p className="chat-status">
                                <span className="status-indicator"></span>
                                Online
                            </p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="chat-messages">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.type === 'user' ? 'message-user' : 'message-bot'}`}
                        >
                            {message.type === 'bot' && (
                                <div className="message-avatar">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className="message-content">
                                <div className="message-bubble">
                                    <p>{message.text}</p>
                                </div>
                                <span className="message-time">{formatTime(message.timestamp)}</span>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="message message-bot">
                            <div className="message-avatar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="message-content">
                                <div className="message-bubble typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                <div className="quick-questions">
                    {quickQuestions.map((question, index) => (
                        <button
                            key={index}
                            className="quick-question-btn"
                            onClick={() => setInputValue(question)}
                        >
                            {question}
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <div className="chat-input-area">
                    <div className="chat-input-wrapper">
                        <textarea
                            ref={inputRef}
                            className="chat-input"
                            placeholder="Ask me anything about your prescription..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows={1}
                        />
                        <button
                            className="send-btn"
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
