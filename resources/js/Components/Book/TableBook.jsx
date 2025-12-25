import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '@/Context/GlobalContext';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Image } from 'primereact/image';

const BookDataView = () => {
  const {
    dataBook,
    bookLayout,
    selectedBook,
    setSelectedBook,
    hoverBookId,
    setHoverBookId,
    filteredBook,
    mapPanel,
    setBookLayout,
  } = useContext(GlobalContext);

  const [firstRecord, setFirstRecord] = useState(0);
  const [numberRecords, setNumberRecords] = useState(20);
  const [totalRecords, setTotalRecords] = useState(filteredBook.length);

  const [data, setData] = useState(filteredBook.slice(0, numberRecords));

  useEffect(() => {
    setFirstRecord(0); // reset to first page
    setNumberRecords(20); // default rows per page
    setTotalRecords(filteredBook.length);
    setData(filteredBook.slice(0, 20)); // first page
  }, [filteredBook]);

  const gridClass = mapPanel
    ? 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3'
    : 'w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6';


  const listClass = mapPanel
    ? `
    flex flex-col xl:flex-row xl:items-start
    m-2 p-4 gap-4 w-full
    rounded-xl border border-gray-200
    bg-white shadow-md
    hover:shadow-lg transition
  `
    : `
    flex flex-col sm:flex-row flex-wrap
    m-2 p-4 gap-4
    rounded-xl border border-gray-200
    bg-white shadow-md
    hover:shadow-lg transition
  `;

  const itemStyle = mapPanel ? {} : { width: 'calc(50% - 1rem)' };

  const getSeverity = book => {
    switch (book.discount) {
      case '-10%':
        return 'success';
      case '-20%':
        return 'info';
      case '-30%':
        return 'danger';
      case '-40%':
        return 'warning';
      default:
        return null;
    }
  };

  const header = () => {
    return (
      <div>
        <DataViewLayoutOptions layout={bookLayout} onChange={(e) => setBookLayout(e.value)} />
      </div>
    );
  };

  const listItem = book => {
    return (
      <div
        key={book.id}
        className={`${listClass}
        ${selectedBook?.id === book.id ? 'ring-2 ring-blue-500' : ''}
        ${hoverBookId === book.id ? 'ring-1 ring-gray-300' : ''}
      `}
        style={itemStyle}
        onMouseEnter={() => setHoverBookId(book.id)}
        onMouseLeave={() => setHoverBookId(null)}
        onClick={() => setSelectedBook(book)}
      >
        {/* Fixed image */}
        <div className="w-[120px] h-[160px] flex items-center justify-center bg-gray-50 rounded-md shadow-sm">
          <Image
            src={book.image}
            alt={book.title}
            className="max-w-full object-contain"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-4">
          {/* Left content */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 text-center sm:text-left">
              {book.title}
            </h3>

            {/* Price + discount */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-sm text-gray-700">
                <i className="pi pi-tag"></i>
                <span className="font-semibold">
                  {book.originalPrice}
                </span>
              </span>

              <Tag value={book.discount} severity={getSeverity(book)} />
            </div>

            {/* Author */}
            <span className="text-sm text-gray-500">
              Author: {book.author}
            </span>
          </div>

          {/* Right content */}
          <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 w-full sm:w-auto">
            <span className="text-lg font-semibold text-gray-900">
              € {book.price}
            </span>

            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
            />
          </div>
        </div>
      </div>
    );
  };

  const gridItem = book => {
    return (
      <div className={`${gridClass} p-2`} key={book.id}>
        <div
          className={`
          flex flex-col h-full
          p-4 rounded-xl border border-gray-200
          bg-white shadow-md
          hover:shadow-lg transition
          cursor-pointer
          ${selectedBook?.id === book.id ? 'ring-2 ring-blue-500' : ''}
          ${hoverBookId === book.id ? 'ring-1 ring-gray-300' : ''}
        `}
          onMouseEnter={() => setHoverBookId(book.id)}
          onMouseLeave={() => setHoverBookId(null)}
          onClick={() => setSelectedBook(book)}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <i className="pi pi-tag"></i>
              <span>Original: {book.originalPrice}</span>
            </div>

            <Tag value={book.discount} severity={getSeverity(book)} />
          </div>

          {/* Image */}
          <div className="flex justify-center items-center mb-4">
            <Image
              src={book.image}
              alt={book.title}
              className="
      w-[120px] h-[160px]
      object-contain
      rounded-md
      shadow-sm
      bg-gray-50
    "
            />
          </div>

          {/* Title + Author */}
          <div className="flex-1 text-center">
            <h3
              className="text-lg font-semibold text-gray-900 leading-tight line-clamp-2"
            >
              {book.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Author: {book.author}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <span className="text-base font-semibold text-gray-900">
              € {book.price}
            </span>

            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
            />
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (book, layout, index) => {
    if (!book) return null;

    switch (layout) {
      case 'list':
        return listItem(book, index);
      case 'grid':
        return gridItem(book);
      default:
        return null;
    }
  };

  const listTemplate = (books, layout) => {
    return (
      <div className="flex flex-wrap">
        {books.map((book, index) => itemTemplate(book, layout, index))}
      </div>
    );
  };

  const onPage = event => {
    setFirstRecord(event.first);
    setNumberRecords(event.rows);
    setData(filteredBook.slice(event.first, event.first + event.rows));
  };

  return (
    <div className="card" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="rounded-xl border-4 border-blue-500 dark:border-blue-400 overflow-hidden">
        <DataView
          value={data}
          listTemplate={listTemplate}
          layout={bookLayout}
          lazy
          paginator
          alwaysShowPaginator
          paginatorPosition="bottom"
          rows={numberRecords}
          first={firstRecord}
          totalRecords={totalRecords}
          rowsPerPageOptions={[10, 20, 30]}
          onPage={onPage}
          header={header()}
        />
      </div>
    </div>
  );
};

export default BookDataView;
