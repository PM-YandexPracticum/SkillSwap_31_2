import * as React from 'react';

const useLocalStorageSubscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dispatchStorageEvent(key: string, newValue: any) {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
}

const getLocalStorageServerSnapshot = () => {
  throw Error('useLocalStorage is a client-only hook');
};

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setLocalStorageItem = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLocalStorage = (key: string, initialValue: any) => {
  const getSnapshot = () => getLocalStorageItem(key);

  // Используем хук useSyncExternalStore для подписки на события изменения хранилища и получения актуальных значений вместо useState, чтобы избежать лишних перерисовок при изменении значения хранилища из-за несоответствий гидратации. Рекомендация React комьюнити.
  const store = React.useSyncExternalStore(
    useLocalStorageSubscribe,
    getSnapshot,
    getLocalStorageServerSnapshot
  );

  const setState = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (v: any) => {
      try {
        const nextState = typeof v === 'function' ? v(JSON.parse(store!)) : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      }
    },
    [key, store]
  );

  React.useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== 'undefined'
    ) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
};
