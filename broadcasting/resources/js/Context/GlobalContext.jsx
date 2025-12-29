import { createContext, useState, useRef, useEffect } from 'react';
import { useThemeMode } from 'flowbite-react';
//import { Link, useForm, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Toast } from 'primereact/toast';

//import { useEcho } from '@laravel/echo-react';
//import { useEcho, useEchoPublic } from '@laravel/echo-react';
import { useEcho, useEchoPublic, configureEcho } from '@laravel/echo-react';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

  configureEcho({
    broadcaster: 'reverb',
  });

  useEchoPublic('books', 'BookCreated', ({ book }) => {
    setDataBook(curr => [...curr, book]);
    console.log('BookCreated');
  });

  // Book updated
  useEchoPublic('books', 'BookUpdated', ({ book }) => {
    setDataBook(curr => curr.map(b => (b.id === book.id ? book : b)));
    console.log('BookUpdated');

  });

  // Subscribe to "books" channel and "BookUpdated" event
  /* useEcho('books', 'BookUpdated', (event) => {
    const { book, action } = event;

    setDataBook((prev) => {
      switch (action) {
        case 'created':
          return [...prev, book];
        case 'updated':
          return prev.map((b) => (b.id === book.id ? book : b));
        case 'deleted':
          return prev.filter((b) => b.id !== book.id);
        default:
          return prev;
      }
    });
  }); */

  const { mode, setMode } = useThemeMode();
  const [themeMode, setThemeMode] = useState(() => mode || 'dark');

  //const [dataBook, setDataBook] = useState(dataBookJson.slice(0, 100));
  const [dataBook, setDataBook] = useState([])

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

  const [modalBookCreate, setModalBookCreate] = useState(false);
  const [modalBookShow, setModalBookShow] = useState(false);
  const [modalBookUpdate, setModalBookUpdate] = useState(false);
  const [modalBookDelete, setModalBookDelete] = useState(false);
  const [modalBookSearch, setModalBookSearch] = useState(false);

  const toastMessage = useRef(null);

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

  /* useEffect(() => {
    echo.channel('books')
      .listen('.BookUpdated', ({ book, action }) => {
        setDataBook(prev => {
          switch (action) {
            case 'created':
              return [...prev, book]

            case 'updated':
              return prev.map(b =>
                b.id === book.id ? book : b
              )

            case 'deleted':
              return prev.filter(b =>
                b.id !== book.id
              )

            default:
              return prev
          }
        })
      })

    return () => {
      echo.leave('books')
    }
  }, []) */

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

        modalBookCreate, setModalBookCreate,
        modalBookShow, setModalBookShow,
        modalBookUpdate, setModalBookUpdate,
        modalBookDelete, setModalBookDelete,
        modalBookSearch, setModalBookSearch,

        toastMessage,

      }}
    >
      <Toast ref={toastMessage} position="bottom-right" />
      {children}
    </GlobalContext.Provider>
  );
}
