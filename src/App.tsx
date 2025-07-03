import React from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, sendMessage, messagesEndRef } = useChat();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <ChatHeader />
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input */}
      <div className="max-w-4xl mx-auto w-full">
        <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default App;