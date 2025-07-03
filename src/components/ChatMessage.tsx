import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';
import { clsx } from 'clsx';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={clsx(
      'flex gap-3 p-4 animate-slide-up',
      isUser ? 'flex-row-reverse' : 'flex-row'
    )}>
      <div className={clsx(
        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
        isUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-600'
      )}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      
      <div className={clsx(
        'max-w-[80%] rounded-2xl px-4 py-2 shadow-sm',
        isUser 
          ? 'bg-blue-500 text-white rounded-br-md' 
          : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div className={clsx(
          'text-xs mt-1 opacity-70',
          isUser ? 'text-blue-100' : 'text-gray-500'
        )}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};