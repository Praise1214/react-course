import {useRef, useEffect} from 'react';
import {ChatMessage} from './ChatMessage';
import './ChatMessages.css';

function useAutoScroll(dependencies) {
    const containerRef = useRef(null);

    useEffect(() => {
    const containerElem = containerRef.current;
    if(containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight
    }
  }, dependencies) 
  return containerRef;
}

function ChatMessages ({chatMessages}) {
    const chatMessageRef = useAutoScroll([chatMessages]);
    return (
      <div className = "chat-messages-container"
        ref = {chatMessageRef}
      >
  
        {chatMessages.length === 0 && (
          <div className = "welcome-message">
            Welcome to the chatbot project! Send a message using the text below
          </div>
        )}
  
        {chatMessages.map((chatMessage) => {
            return (
              <ChatMessage 
                message = {chatMessage.message}
                sender = {chatMessage.sender}
                time = {chatMessage.time}
                key = {chatMessage.id}
              />
            )
        })}
    </div>
    )				
  }

  export default ChatMessages;