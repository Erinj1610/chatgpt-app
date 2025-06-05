import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    const res = await axios.post('/api/chat', { message: input });
    const reply = res.data.choices[0].message;
    setMessages(prev => [...prev, reply]);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>ChatGPT Web App</h1>
      <div>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.role}:</strong> {m.content}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
        style={{ width: '60%', marginRight: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </main>
  );
}
