import React, { useState, useEffect, useRef } from 'react';
import { Document, ChatMessage } from '../../types';
import { MessageSquare, Send, User, Bot } from 'lucide-react';

interface ChatViewProps {
  document: Document;
}

const ChatView: React.FC<ChatViewProps> = ({ document }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial greeting message
    const initialMessage: ChatMessage = {
      id: '1',
      content: `Hello! I'm your AI learning assistant. I've analyzed "${document.name}" and I'm ready to help you understand the content better. You can ask me questions about the document or test your knowledge.`,
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
  }, [document]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "That's a great question! Based on the document, the key concept relates to how information is structured and organized for better understanding.",
        "According to the document, there are three main aspects to consider. First, the foundational principles, second, the practical applications, and third, the expected outcomes.",
        "You're on the right track! The document does mention that relationship. Let me explain it in more detail...",
        "Excellent question for testing your knowledge. Think about how the concepts in section 2 relate to the examples in section 4.",
        "I'd recommend focusing on understanding the core principles first, then moving on to the practical applications. The document emphasizes the importance of this approach."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-green-600 dark:text-green-400" />
          Chat with AI Assistant
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Ask questions about the document or test your understanding of the material.
        </p>
      </div>
      
      {/* Chat interface */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Chat messages */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-850">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                    message.sender === 'user' 
                      ? 'bg-blue-100 dark:bg-blue-900 ml-2 -mr-2'
                      : 'bg-green-100 dark:bg-green-900 -ml-2'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  
                  <div className={`px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}>
                    <p>{message.content}</p>
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center -ml-2 bg-green-100 dark:bg-green-900">
                    <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  
                  <div className="ml-2 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Message input */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask a question about the document..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded-r-lg flex items-center justify-center ${
                newMessage.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Try asking: "What are the main concepts in this document?" or "Test my knowledge about..."
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;