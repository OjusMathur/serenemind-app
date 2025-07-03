import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, ChatState } from '../types/chat';
import { generateAIResponse } from '../utils/aiService';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        content: "Hello! I'm your AI assistant. I'm here to help answer questions, provide information, or just have a friendly conversation. What would you like to talk about today?",
        role: 'assistant',
        timestamp: new Date(),
      }
    ],
    isLoading: false,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, scrollToBottom]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const aiResponse = await generateAIResponse([...chatState.messages, userMessage]);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }));
    }
  }, [chatState.messages]);

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    sendMessage,
    messagesEndRef,
  };
};