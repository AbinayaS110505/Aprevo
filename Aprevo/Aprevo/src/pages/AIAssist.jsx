import React, { useState } from 'react';
import '../assets/css/AIAssist.css';

function AIAssist() {
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // Add user's question to chat
    const userEntry = { from: 'user', text: question };
    setChat(prev => [...prev, userEntry]);
    setQuestion('');

    // Simulate AI response (replace with Gemini/OpenAI call)
    const aiResponse = await fetchAIResponse(question);

    setChat(prev => [...prev, { from: 'bot', text: aiResponse }]);
  };

  async function fetchAIResponse(q) {
    // MOCKED response; replace this call with real AI API
    return new Promise(res => {
      setTimeout(() => res(`AI Assistant answer to: "${q}"`), 1000);
    });
  }

  return (
    <div className="ai-container">
      <h2>🌟 AI Assistant</h2>
      <div className="chat-box">
        {chat.map((msg, i) => (
          <div key={i} className={`chat-entry ${msg.from}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form className="ai-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask anything about weather, climate, operations..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <button type="submit">Ask AI</button>
      </form>
    </div>
  );
}

export default AIAssist;
