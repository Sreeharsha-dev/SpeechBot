class VoiceChatbot {
    constructor() {
        this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.setupSpeechRecognition();
        this.setupUI();
    }

    setupSpeechRecognition() {
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            this.addMessage(transcript, 'user');
            this.processUserInput(transcript);
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            const errorMessage = `Speech recognition error: ${event.error}`;
            this.updateStatus(errorMessage);
            this.addMessage(errorMessage, 'error');
            this.speak(errorMessage);
            this.stopListening();
        };

        this.recognition.onend = () => {
            if (this.isListening) {
                this.recognition.start();
            }
        };
    }

    setupUI() {
        this.startBtn = document.getElementById('startBtn');
        this.statusDiv = document.getElementById('status');
        this.chatContainer = document.getElementById('chatContainer');

        this.startBtn.addEventListener('click', () => {
            if (this.isListening) {
                this.stopListening();
            } else {
                this.startListening();
            }
        });
    }

    startListening() {
        try {
            this.isListening = true;
            this.recognition.start();
            this.startBtn.textContent = 'Stop Listening';
            this.startBtn.classList.add('listening');
            this.updateStatus('Listening...');
        } catch (error) {
            const errorMessage = 'Error starting speech recognition. Please make sure your browser supports this feature.';
            this.handleError(errorMessage);
        }
    }

    stopListening() {
        this.isListening = false;
        this.recognition.stop();
        this.startBtn.textContent = 'Start Listening';
        this.startBtn.classList.remove('listening');
        this.updateStatus('Click to start speaking');
    }

    updateStatus(message) {
        this.statusDiv.textContent = message;
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        // Add timestamp
        const timestamp = new Date().toLocaleTimeString();
        const timeSpan = document.createElement('span');
        timeSpan.classList.add('timestamp');
        timeSpan.textContent = timestamp;
        
        const textSpan = document.createElement('span');
        textSpan.classList.add('message-text');
        textSpan.textContent = text;
        
        messageDiv.appendChild(timeSpan);
        messageDiv.appendChild(textSpan);
        
        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    handleError(errorMessage) {
        console.error(errorMessage);
        this.addMessage(errorMessage, 'error');
        this.speak(errorMessage);
        this.stopListening();
    }

    async processUserInput(text) {
        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Server error occurred');
            }

            if (data.error) {
                throw new Error(data.error);
            }

            this.addMessage(data.response, 'bot');
            this.speak(data.response);
        } catch (error) {
            const errorMessage = 'Sorry, there was an error processing your request. ' + error.message;
            this.handleError(errorMessage);
        }
    }

    speak(text) {
        // Cancel any ongoing speech
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onend = () => {
            if (this.isListening) {
                this.recognition.start();
            }
        };

        this.synthesis.speak(utterance);
    }
}

// Initialize the chatbot when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new VoiceChatbot();
});