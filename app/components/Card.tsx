import React from 'react';

interface CardProps {
  text: string;
}

const Card: React.FC<CardProps> = ({ text }) => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-2 text-black">
      {text}
    </div>
  );
};

export default Card;