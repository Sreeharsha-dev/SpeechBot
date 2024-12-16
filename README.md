# Voice Chatbot

A real-time voice-enabled chatbot that uses speech recognition, Google's Gemini Pro AI, and text-to-speech synthesis for natural conversations.

## Features

- 🎤 Real-time speech recognition
- 🤖 AI-powered responses using Google's Gemini Pro
- 🔊 Natural text-to-speech output
- 💬 Interactive chat interface
- 🌓 Light/Dark mode support
- ⚡ Real-time response handling

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Web Speech API
  - SpeechRecognition
  - SpeechSynthesis

### Backend
- Python 3.x
- Flask
- Google Generative AI (Gemini Pro)
- Flask-CORS

## Prerequisites

- Python 3.x
- Node.js and npm
- Google AI API key
- Modern web browser (Chrome recommended)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd voice-chatbot
   ```

2. **Backend Setup**
   ```bash
   # Create and activate virtual environment (optional but recommended)
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file in the root directory
   echo "GOOGLE_AI_API_KEY=your_api_key_here" > .env
   ```

4. **Frontend Setup**
   ```bash
   # Install Vite (if not already installed)
   npm install
   ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   python app.py
   ```
   The server will start on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Project Structure

```
voice-chatbot/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styles
│   └── main.js             # Frontend logic
├── backend/
│   ├── app.py              # Flask server
│   └── requirements.txt     # Python dependencies
├── .env                    # Environment variables
└── README.md              # Project documentation
```

## Components

### 1. Speech Recognition
- Uses Web Speech API's SpeechRecognition
- Continuous listening mode
- Error handling for unsupported browsers

### 2. AI Processing
- Integrates with Google's Gemini Pro
- Processes natural language input
- Generates contextual responses

### 3. Text-to-Speech
- Natural voice synthesis
- Configurable speech parameters
- Queue management for responses

## Usage

1. Click the "Start Listening" button
2. Speak your message
3. Wait for the AI response
4. The response will be displayed and spoken back

## Error Handling

The application handles various error scenarios:
- Speech recognition errors
- Network connectivity issues
- API errors
- Browser compatibility issues

## Security Considerations

- API key protection using environment variables
- CORS configuration for secure communication
- Input validation on both frontend and backend
- No persistent data storage

## Browser Compatibility

Recommended browsers:
- Google Chrome (preferred)
- Microsoft Edge
- Firefox
- Safari (limited support)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google AI for Gemini Pro API
- Web Speech API contributors
- Flask and its community

## Troubleshooting

### Common Issues

1. **Speech Recognition Not Working**
   - Ensure you're using a supported browser
   - Check microphone permissions
   - Verify stable internet connection

2. **API Key Issues**
   - Verify .env file configuration
   - Check API key validity
   - Ensure proper environment variable loading

3. **Backend Connection Failed**
   - Confirm backend server is running
   - Check CORS configuration
   - Verify correct port settings

### Support

For issues and feature requests, please create an issue in the repository.