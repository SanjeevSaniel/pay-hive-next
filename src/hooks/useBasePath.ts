'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useBasePath = () => {
  const { userId } = useParams();
  const [basePath, setBasePath] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      setBasePath(`/v1/${userId}`);
    } else {
      console.error('userId not found in URL parameters');
    }
  }, [userId]);

  return basePath;
};

export default useBasePath;
