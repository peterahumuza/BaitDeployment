import React, { useEffect, useState } from 'react';
import { MarkdownComponents } from "@/components/contributions/Markdown";
import ReactMarkdown from 'react-markdown';

export default function PrettyPrinting({ content, messagesEndRef }) {
    const [displayedMessage, setDisplayedMessage] = useState('●');
    const interval = 30;

    useEffect(() => {
      let timeoutId;
      if (content && content.length > 0) {
          const words = (content || '').split(' ');
          let currentText = '';
          let index = 0;
  
          const typeWord = () => {
            if (index < words.length) {
              currentText += words[index] + ' ';
              if (index < words.length - 1) {
                setDisplayedMessage(currentText + '●');
              } else {
                setDisplayedMessage(currentText.trim());
                timeoutId = setTimeout(() => {
                  setDisplayedMessage(currentText.trim());
                }, 10);
              }
              index++;
              timeoutId = setTimeout(typeWord, interval);
          }
          else {
            if (messagesEndRef) {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
          }
          }
          typeWord();
      } else {
          setDisplayedMessage(content || '');
      }
  
      return () => clearTimeout(timeoutId);
  }, [content, messagesEndRef]);
  
    return (
      
      <ReactMarkdown components={MarkdownComponents}>
          { content && content.length > 0 ? displayedMessage : '●'}
      </ReactMarkdown>
    );
  }