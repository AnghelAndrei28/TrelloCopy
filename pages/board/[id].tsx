import { useRouter } from 'next/router';
import React from 'react';

const BoardPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <h1 className="text-2xl font-bold">Board ID: {id}</h1>
    </div>
  );
};

export default BoardPage;