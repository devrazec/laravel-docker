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
} from "react-icons/hi";
import { Icon } from '@iconify-icon/react';
import { Bars, Search } from 'flowbite-react-icons/outline';

const DeleteBook = () => {

    const { mode, themeMode, dataBook, totalBook, filteredBook, modalBookDelete, setModalBookDelete, } = useContext(GlobalContext)

    return (
        <Modal onClose={() => setModalBookDelete(false)} show={modalBookDelete} size="md" dismissible>
            <div className="rounded-xl border-4 border-blue-500 dark:border-blue-500 overflow-hidden">
                <ModalHeader className="border-none p-2 dark:bg-gray-800">
                    <span className="sr-only">Delete Book</span>
                </ModalHeader>
                <ModalBody className="px-6 pt-0 pb-6">
                    <div className="flex flex-col items-center gap-y-6 text-center">
                        <HiOutlineExclamationCircle className="mx-auto h-20 w-20 text-red-600" />
                        <p className="text-xl font-normal text-gray-50 dark:text-gray-50">
                            Are you sure you want to delete this Book?
                        </p>
                        <div className="flex items-center gap-x-3">
                            <Button
                                color="red"
                                theme={{ base: "px-0" }}
                                onClick={() => setModalBookDelete(false)}
                            >
                                <span className="text-base font-medium dark:text-gray-50">Yes, I'm sure</span>
                            </Button>
                            <Button
                                color="alternative"
                                theme={{ base: "px-0" }}
                                onClick={() => setModalBookDelete(false)}
                            >
                                <span className="text-base font-medium dark:text-gray-50">No, cancel</span>
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </div>
        </Modal>
    );
}

export default React.memo(DeleteBook);