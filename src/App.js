import React, { useRef, useState, useEffect} from 'react';
import io from 'socket.io-client'

import './App.css';

const socket = io('ws://localhost:8000', {
  path: '/socket.io',
  withCredentials: true,
  transports: ['websocket']
})

function App() {
  const chatInput = useRef();
  const [messages, setMessages] = useState([]);

  const handleChatButton = () => {
    const chatRef = chatInput.current;

    socket.emit('message', chatRef.value);
  }
  
  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message])
      chatInput.current.value = ''
    })
  }, [])

  return (
    <div className="App">
      <ul className="chat-list">
        {messages.map((item, idx) => <li key={idx}> {item} </li>)}
      </ul>
      <div className="button-wrapper"> 
        <textarea placeholder="채팅창" ref={chatInput}/>
        <button type="button" onClick={handleChatButton}> 전송 </button>
      </div>
    </div>
  );
}

export default App;
