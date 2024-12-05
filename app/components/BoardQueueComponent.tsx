import React, { useState, useEffect } from 'react';
import Card from './Card';
import CreateCardModal from './CreateCardModal';
import CardDetails from './CardDetails';

interface BoardQueueComponentProps {
  id: string;
  title: string;
  onEditQueue: (queueId: string, newTitle: string) => void;
  onDeleteQueue: (queueId: string) => void;
  onCreateCard: (title: string, description: string) => void;
  refetch: () => void;
}

const BoardQueueComponent: React.FC<BoardQueueComponentProps> = ({ id, title, onEditQueue, onDeleteQueue, onCreateCard, refetch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [queueCards, setQueueCards] = useState<{ id: string; title: string; description: string }[]>([]);
  const [selectedCard, setSelectedCard] = useState<{ id: string; title: string; description: string } | null>(null);

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

  const handleEditQueue = async (newTitle: string) => {
    try {
      const response = await fetch('/api/updateQueueTitle', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title: newTitle }),
      });

      if (response.ok) {
        refetch();
      } else {
        console.error('Failed to update queue title');
      }
    } catch (error) {
      console.error('Error updating queue title:', error);
    }
  };

  const handleDeleteQueue = async () => {
    try {
      const response = await fetch(`/api/deleteQueue?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        refetch();
      } else {
        console.error('Failed to delete queue');
      }
    } catch (error) {
      console.error('Error deleting queue:', error);
    }
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

  const handleUpdateCard = async (cardId: string, title: string, description: string) => {
    try {
      const response = await fetch('/api/updateCard', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: cardId, title, description }),
      });

      if (response.ok) {
        const updatedCard = await response.json();
        setQueueCards(queueCards.map(card => card.id === cardId ? { ...card, title, description } : card));
      } else {
        console.error('Failed to update card');
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      const response = await fetch(`/api/deleteCard?id=${cardId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQueueCards(queueCards.filter(card => card.id !== cardId));
      } else {
        console.error('Failed to delete card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
          ...
        </button>
        {isMenuOpen && (
          <div className="absolute right-4 top-12 bg-white border border-gray-300 rounded-lg shadow-lg">
            <button onClick={() => handleEditQueue(prompt('Enter new title') || title)} className="block px-4 py-2 text-left w-full hover:bg-gray-100 text-black">
              Edit
            </button>
            <button onClick={handleDeleteQueue} className="block px-4 py-2 text-left w-full hover:bg-gray-100 text-black">
              Delete
            </button>
          </div>
        )}
      </div>
      <div>
        {queueCards.map((card) => (
          <div key={card.id} onClick={() => setSelectedCard(card)}>
            <Card text={`${card.title}`} />
          </div>
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
      {selectedCard && (
        <CardDetails
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          card={selectedCard}
          onUpdate={handleUpdateCard}
          onDelete={handleDeleteCard}
        />
      )}
    </div>
  );
};

export default BoardQueueComponent;