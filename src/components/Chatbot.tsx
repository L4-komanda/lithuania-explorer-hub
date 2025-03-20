
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Age group avatars - these would be replaced with actual age-appropriate avatars
const ageGroupAvatars = {
  child: "/lovable-uploads/4c2fdec9-be0f-4290-ba6c-37e8aaf7dee3.png", // For demonstration - replace with child avatar
  teen: "/lovable-uploads/4c2fdec9-be0f-4290-ba6c-37e8aaf7dee3.png", // For demonstration - replace with teen avatar
  adult: "/lovable-uploads/4c2fdec9-be0f-4290-ba6c-37e8aaf7dee3.png", // For demonstration - replace with adult avatar
  senior: "/lovable-uploads/4c2fdec9-be0f-4290-ba6c-37e8aaf7dee3.png", // For demonstration - replace with senior avatar
};

// Animated GIFs for chat responses
const chatAnimations = [
  "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif", // Thinking
  "https://media.giphy.com/media/dZXzmKGKNiJtDxuwGg/giphy.gif", // Excited
  "https://media.giphy.com/media/w8f9g2x44aGI8/giphy.gif",      // Happy
  "https://media.giphy.com/media/3orif0K5SbolXuXhZe/giphy.gif"  // Explaining
];

interface ChatbotProps {
  userAge?: number;
}

const Chatbot: React.FC<ChatbotProps> = ({ userAge = 30 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean, animation?: string}>>([
    { text: "Sveiki! Kuo galėčiau jums padėti?", isUser: false, animation: chatAnimations[2] }
  ]);
  const [input, setInput] = useState("");
  const [ageGroup, setAgeGroup] = useState<keyof typeof ageGroupAvatars>("adult");

  // Determine age group based on user age
  useEffect(() => {
    if (userAge < 18) {
      setAgeGroup("child");
    } else if (userAge < 30) {
      setAgeGroup("teen");
    } else if (userAge < 60) {
      setAgeGroup("adult");
    } else {
      setAgeGroup("senior");
    }
  }, [userAge]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    const userMessage = input;
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      // Select random animation for response
      const randomAnimationIndex = Math.floor(Math.random() * chatAnimations.length);
      
      let botResponse = "Dėkoju už jūsų žinutę! Netrukus atsakysiu.";
      
      // Simple response logic based on input keywords
      if (userMessage.toLowerCase().includes("labas") || userMessage.toLowerCase().includes("sveiki")) {
        botResponse = "Labas! Kaip galiu padėti?";
      } else if (userMessage.toLowerCase().includes("ačiū") || userMessage.toLowerCase().includes("aciu")) {
        botResponse = "Visada malonu padėti!";
      } else if (userMessage.toLowerCase().includes("vieta") || userMessage.toLowerCase().includes("miestas")) {
        botResponse = "Ar norėtumėte sužinoti daugiau apie lankytinas vietas? Galite peržiūrėti jas žemėlapyje!";
      }
      
      setMessages(prev => [
        ...prev, 
        { 
          text: botResponse, 
          isUser: false, 
          animation: chatAnimations[randomAnimationIndex] 
        }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 z-50 flex flex-col items-end">
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-105",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Avatar className="h-10 w-10 border-2 border-white animate-pulse">
            <AvatarImage src={ageGroupAvatars[ageGroup]} alt="Chatbot" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        )}
      </Button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="bg-card border shadow-xl rounded-xl w-80 h-96 mb-2 flex flex-col overflow-hidden animate-slide-up">
          {/* Chat header */}
          <div className="bg-primary p-3 text-primary-foreground">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={ageGroupAvatars[ageGroup]} alt="Chatbot" />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">Virtualus asistentas</h3>
                <p className="text-xs opacity-80">Visada pasirengęs padėti</p>
              </div>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={cn(
                  "max-w-[80%] p-2 rounded-lg",
                  message.isUser 
                    ? "bg-primary text-primary-foreground self-end rounded-br-none" 
                    : "bg-muted self-start rounded-bl-none"
                )}
              >
                {!message.isUser && message.animation && (
                  <div className="mb-2 bg-card rounded overflow-hidden">
                    <img 
                      src={message.animation} 
                      alt="Chatbot animation" 
                      className="w-full h-24 object-cover"
                    />
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
              </div>
            ))}
          </div>
          
          {/* Chat input */}
          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Įveskite žinutę..."
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button onClick={handleSendMessage} size="sm">
                Siųsti
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
