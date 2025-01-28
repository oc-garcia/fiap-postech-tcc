import { useState, useEffect } from 'react';
import { subdisciplines } from '@/utils/subdisciplines';

const useGetSubdisciplines = (subject: string) => {
  const [subdisciplineList, setSubdisciplineList] = useState<string[]>([]);

  useEffect(() => {
    if (subject) {
      setSubdisciplineList(subdisciplines[subject] || []);
    }
  }, [subject]);

  return subdisciplineList;
};

export default useGetSubdisciplines;