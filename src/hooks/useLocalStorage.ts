import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Başlangıçta localStorage'dan veriyi okuyoruz
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Eğer veri varsa JSON'dan parse et, yoksa varsayılan değeri kullan
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key “' + key + '”:', error);
      return initialValue;
    }
  });

  // State her değiştiğinde localStorage'ı güncelliyoruz (Senkronizasyon)
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error setting localStorage key “' + key + '”:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
