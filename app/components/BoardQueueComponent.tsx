import React, { useState, useEffect } from 'react';
import Card from './Card';
import CreateCardModal from './CreateCardModal';

interface BoardQueueComponentProps {
  id: string;
  title: string;
  onEdit: () => void;
  onDelete: () => void;
  onCreateCard: (title: string, description: string) => void;
}

const BoardQueueComponent: React.FC<BoardQueueComponentProps> = ({ id, title, onEdit, onDelete, onCreateCard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queueCards, setQueueCards] = useState<{ id: string; title: string; description: string }[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`/api/getCards?queueId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setQueueCards(data.map((card: any) => ({ id: card._id, title: card.title, description: card.description })));
        } else {
          console.error('Failed to fetch cards');
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [id]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    onEdit();
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setIsMenuOpen(false);
  };

  const handleCreateCard = async (title: string, description: string) => {
    try {
      const response = await fetch('/api/addCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queueId: id, title, description }),
      });

      if (response.ok) {
        const data = await response.json();
        const newCard = {
          id: data.card._id,
          title,
          description,
        };
        setQueueCards([...queueCards, newCard]);
        onCreateCard(title, description);
      } else {
        console.error('Failed to create card');
      }
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
          ...
        </button>
        {isMenuOpen && (
          <div className="absolute right-4 top-12 bg-white border border-gray-300 rounded-lg shadow-lg">
            <button onClick={handleEdit} className="block px-4 py-2 text-left w-full hover:bg-gray-100">
              Edit
            </button>
            <button onClick={handleDelete} className="block px-4 py-2 text-left w-full hover:bg-gray-100">
              Delete
            </button>
          </div>
        )}
      </div>
      <div>
        {queueCards.map((card) => (
          <Card key={card.id} text={`${card.title}`} />
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Card
      </button>
      <CreateCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateCard}
      />
    </div>
  );
};

export default BoardQueueComponent;