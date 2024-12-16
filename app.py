from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get API key from environment variable
api_key = os.getenv('GOOGLE_AI_API_KEY')

if not api_key:
    raise ValueError("GOOGLE_AI_API_KEY environment variable is not set!")

# Configure Google AI
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-pro')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Validate request data
        if not request.is_json:
            return jsonify({'error': 'Request must be JSON'}), 400
        
        data = request.json
        user_message = data.get('message')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Generate response using Google AI
        response = model.generate_content(user_message)
        
        if not response:
            return jsonify({'error': 'Failed to generate response'}), 500
        
        return jsonify({
            'response': response.text
        })
    
    except Exception as e:
        # Log the error (in a production environment, use proper logging)
        print(f"Error: {str(e)}")
        return jsonify({
            'error': f'An error occurred: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)