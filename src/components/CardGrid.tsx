import React from 'react';
import { motion } from 'framer-motion';

interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface CardGridProps {
  cards: Card[];
  onCardClick: (id: number) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
          onClick={() => onCardClick(card.id)}
        >
          <div className="relative overflow-hidden aspect-w-16 aspect-h-9">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-primary">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardGrid;