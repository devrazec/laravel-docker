import { createContext, useState, useEffect } from 'react';
import { useThemeMode } from 'flowbite-react';
//import { Link, useForm, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

import dataBookJson from '../../../database/data-book.json';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  const { mode, setMode } = useThemeMode();
  const [themeMode, setThemeMode] = useState(() => mode || 'dark');

  //const [dataBook, setDataBook] = useState(dataBookJson.slice(0, 100));
  const [dataBook, setDataBook] = useState([]);

  const [selectedBook, setSelectedBook] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBookName, setSelectedBookName] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1, 100]);
  const [hoverBookId, setHoverBookId] = useState(null);
  const [filteredBook, setFilteredBook] = useState([]);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const [totalBook, setTotalBook] = useState(dataBook.length);
  const [totalFilteredBook, setTotalFilteredBook] = useState(
    filteredBook.length
  );

  const [bookLayout, setBookLayout] = useState('grid');
  const [mapPanel, setMapPanel] = useState(false);

  useEffect(() => {
    if (!dataBook) {
      setFilteredBook([]);
      return;
    }

    let filtered = [...dataBook];

    if (selectedBookName) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(selectedBookName.toLowerCase())
      );
    }

    if (selectedPrice[0] > 1 || selectedPrice[1] < 100) {
      filtered = filtered.filter(
        p => p.price >= selectedPrice[0] && p.price <= selectedPrice[1]
      );
    }

    // Sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (sortField === 'price') {
          // Remove any non-digit characters (like currency symbols) and convert to number
          valA = Number(String(valA).replace(/[^\d.-]/g, ''));
          valB = Number(String(valB).replace(/[^\d.-]/g, ''));
        } else if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }

        if (valA < valB) return sortOrder === 1 ? -1 : 1;
        if (valA > valB) return sortOrder === 1 ? 1 : -1;
        return 0;
      });
    }

    setFilteredBook(filtered);
  }, [
    dataBook,
    selectedBookName,
    selectedPrice,
    sortField,
    sortOrder,
  ]);

  return (
    <GlobalContext.Provider
      value={{
        themeMode,
        setThemeMode,

        dataBook,
        setDataBook,

        selectedBookId,
        setSelectedBookId,
        selectedBook,
        setSelectedBook,
        hoverBookId,
        setHoverBookId,
        selectedBookName,
        setSelectedBookName,
        selectedPrice,
        setSelectedPrice,
        filteredBook,
        setFilteredBook,

        sortField,
        setSortField,
        sortOrder,
        setSortOrder,

        totalBook,
        setTotalBook,
        totalFilteredBook,
        setTotalFilteredBook,

        bookLayout, setBookLayout,
        mapPanel, setMapPanel,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
