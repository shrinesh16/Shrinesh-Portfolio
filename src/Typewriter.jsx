import { useState, useEffect } from 'react';

export default function Typewriter({ text, delay = 100, cursorColor = '#00ff33f0' }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span>
      {currentText.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i !== currentText.split('\n').length - 1 && <br />}
        </span>
      ))}
      <span 
        style={{ 
          color: cursorColor,
          display: 'inline-block',
          width: '10px',
          backgroundColor: cursorColor,
          animation: 'blink 1s step-end infinite',
          marginLeft: '4px',
          verticalAlign: 'bottom',
          height: '1em',
        }}
      >
        &nbsp;
      </span>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </span>
  );
}
