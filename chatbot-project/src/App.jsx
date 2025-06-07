import { useEffect, useState} from 'react';
import { ChatInput } from './components/ChatInput';
import { Chatbot } from 'supersimpledev';
import ChatMessages from './components/ChatMessages';
import './App.css'


function App () {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  // Initialize chatMessages from localStorage or an empty array if not found

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  useEffect(() => {
    Chatbot.addResponses({
      'goodbye': 'Goodbye! Have a great day!',
     'give me a joke': 'Why did the scarecrow win an award? Because he was outstanding in his field!',
     'what is your name?': 'I am a chatbot created by Praise. You can call me Chatbot!',
    })
  }, []);

  return (
    <div className = "app-container"> 
      <ChatMessages 
        chatMessages = {chatMessages}
      />

      <ChatInput 
        chatMessages = {chatMessages}
        setChatMessages = {setChatMessages}
      />

    </div>
  )
}

export default App
