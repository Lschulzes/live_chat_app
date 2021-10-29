export function persistOrGetLocalstorage<T>(
  key: string,
  defaultState: any,
  overwrite: boolean = false
): T {
  const item = localStorage.getItem(key);
  // If the key is found, retrieve that key and return the value as the current state
  if (item?.length && !overwrite) return JSON.parse(item);
  // if not in localStorage return the state passed in

  // Every time the state changes, overwrite the data on localStorage
  localStorage.setItem(key, JSON.stringify(defaultState));

  return defaultState;
}

export enum UITypeActions {
  CLOSE_ROOM = 'CLOSE_ROOM',
  DELETE_QUESTION = 'DELETE_QUESTION',
}
