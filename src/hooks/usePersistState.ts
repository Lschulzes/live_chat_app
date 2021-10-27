import { Dispatch, SetStateAction, useEffect, useState } from 'react';
// PersistState type consists on a tuple of the given generic type >>
// as a given state, and also a dispatch action that sets the new state
type PersistState<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistState<T>(key: string, initialState: T): PersistState<T> {
  const [state, setState] = useState<T>(() => {
    const item = localStorage.getItem(key);
    // If the key is found, retrieve that key and return the value as the current state
    if (item?.length) return JSON.parse(item);
    // if not in localStorage return the state passed in
    return initialState;
  });

  useEffect(() => {
    // Every time the state changes, overwrite the data on localStorage
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState];
}

export default usePersistState;
