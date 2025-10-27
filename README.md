# AiChatApp

An interactive AI-powered chat application built using HTML, CSS, and JavaScript with a Node.js backend.
This app allows users to have natural conversations with an AI assistant that can also provide real-time weather updates for any city.

 Features

 Conversational AI that responds naturally to user queries.

 Real-time weather information using the integrated weather agent.

 Beautiful, responsive, and minimal UI.

 Built with Node.js and Express for smooth backend integration.

 Automatically scrolls and updates chat dynamically.


 🧠 Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express

APIs: Weather API (for real-time weather info)

AI Model: Custom logic using OpenAI/Hugging Face (if applicable)

💡 How It Works

The user enters a message in the chat box.

The frontend sends the message to the backend via an API call.

The backend (server.js) processes the input:

If it’s a general chat → handled by aichat.js

If it’s a weather query → handled by weatheragent.js

The AI generates a response and sends it back to the frontend.

The frontend displays the response dynamically in the chat window.
