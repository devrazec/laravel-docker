import React, { useContext, useState, useEffect, useMemo } from 'react';
import { GlobalContext } from '@/Context/GlobalContext';

import {
    theme,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Checkbox,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Textarea,
    TextInput,
    SidebarItem,
} from "flowbite-react";
import { twMerge } from 'tailwind-merge';
import { Link } from '@inertiajs/react';
import { FaPlus } from "react-icons/fa";
import {
    HiChevronLeft,
    HiChevronRight,
    HiCog,
    HiDotsVertical,
    HiExclamationCircle,
    HiHome,
    HiOutlineExclamationCircle,
    HiOutlineUpload,
    HiTrash,
    HiClipboard,
    HiOutlinePlusCircle,
    HiPencilAlt,
    HiOutlineTrash,
    HiDocumentReport,
} from "react-icons/hi";
import { Icon } from '@iconify-icon/react';
import { Bars, Search } from 'flowbite-react-icons/outline';

import EditBook from './UpdateBook';
import DeleteBook from './DeleteBook';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';

const ShowBook = () => {

    const { mode, themeMode, dataBook, totalBook, filteredBook } = useContext(GlobalContext)

    const [isOpenReport, setOpenReport] = useState(false);
    const [isOpenLink, setIsOpenLink] = useState(false);

    return (
        <>

            <SidebarItem href="#" icon={HiDocumentReport} color="blue" onClick={() => setOpenReport(!isOpenReport)}>
                Show
            </SidebarItem>
            <Modal onClose={() => setOpenReport(false)} show={isOpenReport} size="7xl" dismissible>
                <ModalHeader className="border-b border-gray-200 dark:border-gray-600">
                    Show Book
                </ModalHeader>
                <ModalBody>
                    

                </ModalBody>
            </Modal>

        </>
    );
}

export default React.memo(ShowBook);