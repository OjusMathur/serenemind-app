import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Bot size={20} className="text-white" />
        </div>
        
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            AI Assistant
            <Sparkles size={16} className="text-yellow-500" />
          </h1>
          <p className="text-sm text-gray-500">
            Online • Ready to help
          </p>
        </div>
        
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
      </div>
    </div>
  );
};