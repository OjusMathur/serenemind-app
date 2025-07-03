import { Message } from '../types/chat';

// Simulated AI responses for demonstration
const AI_RESPONSES = [
  "That's an interesting question! Let me think about that for a moment.",
  "I understand what you're asking. Here's my perspective on that topic.",
  "Great question! Based on what you've shared, I'd suggest considering a few different approaches.",
  "I appreciate you sharing that with me. Let me provide some insights that might be helpful.",
  "That's a thoughtful observation. Here's how I would approach this situation.",
  "I can definitely help you with that. Let me break this down into manageable steps.",
  "Thanks for the context! This reminds me of similar situations where the key is to focus on the fundamentals.",
  "I see what you're getting at. The most effective approach would likely involve balancing multiple factors.",
  "That's a complex topic with several important considerations. Let me share some key points.",
  "I'm glad you asked about this. It's something that many people find challenging, and here's why.",
];

const FOLLOW_UP_RESPONSES = [
  "Would you like me to elaborate on any particular aspect of this?",
  "Is there a specific part of this you'd like to explore further?",
  "Does this help address your question, or would you like me to focus on something else?",
  "What are your thoughts on this approach?",
  "Are there any other related topics you'd like to discuss?",
];

export const generateAIResponse = async (messages: Message[]): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const lastMessage = messages[messages.length - 1];
  const messageCount = messages.filter(m => m.role === 'user').length;
  
  // Generate contextual responses based on message content
  let response = '';
  
  if (lastMessage.content.toLowerCase().includes('hello') || lastMessage.content.toLowerCase().includes('hi')) {
    response = "Hello! I'm your AI assistant. I'm here to help you with questions, provide information, or just have a conversation. What would you like to talk about today?";
  } else if (lastMessage.content.toLowerCase().includes('help')) {
    response = "I'm here to help! I can assist you with a wide variety of topics including answering questions, providing explanations, helping with problem-solving, or just having a friendly conversation. What specific area would you like help with?";
  } else if (lastMessage.content.toLowerCase().includes('thank')) {
    response = "You're very welcome! I'm glad I could help. Feel free to ask me anything else you'd like to know or discuss.";
  } else {
    // Use random responses for general conversation
    const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    const followUp = Math.random() > 0.6 ? ` ${FOLLOW_UP_RESPONSES[Math.floor(Math.random() * FOLLOW_UP_RESPONSES.length)]}` : '';
    response = randomResponse + followUp;
  }
  
  return response;
};