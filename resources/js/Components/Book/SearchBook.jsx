import React, { useContext, useState, useEffect, useMemo } from 'react';
import { GlobalContext } from '@/Context/GlobalContext';

import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    SidebarItem,
} from "flowbite-react";
import { twMerge } from 'tailwind-merge';
import { Link } from '@inertiajs/react';
import { FaPlus } from "react-icons/fa";
import {
    HiOutlineSearch,
} from "react-icons/hi";
import { Icon } from '@iconify-icon/react';
import { Bars, Search } from 'flowbite-react-icons/outline';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';

const SearchBook = () => {

    const { mode, themeMode, dataBook, totalBook, filteredBook } = useContext(GlobalContext)

    const [isOpen, setOpen] = useState(false);

    const imageBodyTemplate = (rowData) => {
        return <Image src={rowData.image} alt={rowData.title} width="48" className="shadow-2 border-round" />
    };

    return (
        <>
            <SidebarItem href="#" icon={HiOutlineSearch} color="blue" onClick={() => setOpen(!isOpen)}>
                Search
            </SidebarItem>
            <Modal onClose={() => setOpen(false)} show={isOpen} size="7xl" dismissible>
                <div className="rounded-xl border-4 border-blue-500 dark:border-blue-400 overflow-hidden">
                    <ModalHeader className="border-b border-gray-200 dark:border-gray-600 dark:bg-gray-700">
                        Search Book
                    </ModalHeader>
                    <ModalBody className="dark:bg-gray-900">
                        <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <DataTable
                                value={dataBook}
                                stripedRows
                                scrollable
                                scrollHeight="500px"
                                paginator
                                rows={5}
                                rowsPerPageOptions={[5, 10, 25, 50]}
                                filterDisplay="row"
                                selectionMode="single"
                                tableStyle={{ minWidth: '50rem' }}
                                className="text-gray-800"
                            >
                                <Column field="image" header="Image" body={imageBodyTemplate} style={{ width: '12%' }} />
                                <Column field="title" header="Title" sortable filter style={{ width: '35%' }} />
                                <Column field="author" header="Author" sortable filter style={{ width: '35%' }} />
                                <Column field="productId" header="Reference" />
                                <Column field="price" header="Price" sortable />
                            </DataTable>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        </>
    );
}

export default React.memo(SearchBook);