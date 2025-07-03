import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { clsx } from 'clsx';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={disabled}
            rows={1}
            className={clsx(
              'w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 pr-12',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'disabled:bg-gray-50 disabled:text-gray-500',
              'placeholder-gray-500 text-sm leading-relaxed'
            )}
            style={{
              minHeight: '48px',
              maxHeight: '120px',
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={clsx(
            'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center',
            'transition-all duration-200 transform',
            message.trim() && !disabled
              ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          )}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};