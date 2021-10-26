import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type PersistState<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistState<T>(key: string, initialState: T): PersistState<T> {
  const [state, setState] = useState<T>(() => {
    const item = localStorage.getItem(key);
    if (item?.length) return JSON.parse(item);
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

export default usePersistState;
