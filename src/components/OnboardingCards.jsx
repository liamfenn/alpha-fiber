import React, { useState } from 'react';

const OnboardingCards = ({ onComplete }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const cards = [
    { title: 'Movement', description: 'Use W, A, S, D keys to move around', visual: '🏃' },
    { title: 'Interaction', description: 'Press E to interact with doors and objects', visual: '🚪' },
    { title: 'Look Around', description: 'Use your mouse to look around', visual: '👀' },
  ];

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      textAlign: 'center',
      color: 'black',
    }}>
      <h2>{cards[currentCard].title}</h2>
      <p>{cards[currentCard].visual}</p>
      <p>{cards[currentCard].description}</p>
      <button onClick={handleNext}>
        {currentCard < cards.length - 1 ? 'Next' : 'Start Simulation'}
      </button>
    </div>
  );
};

export default OnboardingCards;

