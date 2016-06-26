import localforage from 'localforage'; 

export function loadFromStorage(key) {
  return localforage.getItem(key)
}

export function saveToStorage(key, data) {
  return localforage.setItem(key, data);
}