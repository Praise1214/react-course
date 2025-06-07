import { useState} from 'react';
import {Chatbot} from 'supersimpledev';
import LoadingProfileImage from '../assets/loading-spinner.gif'
import './ChatInput.css';
import dayjs from 'dayjs';

export function ChatInput({chatMessages, setChatMessages}) {

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  
  function saveInputText(event) { 
    setInputText(event.target.value)
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }
    setIsLoading(true);

    setInputText('');

    const newChatMessages = [
      ...chatMessages, 
      {
        message : inputText,
        sender : 'user',
        id : crypto.randomUUID(),
        time : dayjs().format('h:mma'),
      }
    ]

    setChatMessages ([
      ...newChatMessages,
      {
        message : <img src = {LoadingProfileImage} className = "loading-gif"/>,
        sender: 'robot',
        id : crypto.randomUUID(),
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText)
    setChatMessages ([
        ...newChatMessages, 
        {
          message : response,
          sender : 'robot',
          id : crypto.randomUUID(),
          time : dayjs().format('h:mma'),
        }
      ]);
        setIsLoading(false);
  }

	function clearMessages() {
		setChatMessages([]);
		localStorage.removeItem('messages');
	}

  return(
    <div className = "chat-input-container">
      <input 
        placeholder ="Send a message to Chatbot" 
        size = "30"
        onChange = {saveInputText}
        onKeyDown = {(event) => {
          if (event.key === 'Enter') {
            sendMessage()
          };

          if (event.key === 'Escape') {
            setInputText('')
          }
        }}
        value = {inputText}
        className = "chat-input"
      />
      <button
        onClick = {sendMessage}
        className = "send-button"
      >Send</button>

      <button
				onClick = {clearMessages}
				className='clear-button'
			>Clear</button>
    </div>
  );
}
