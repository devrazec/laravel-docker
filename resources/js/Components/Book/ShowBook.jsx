import React, { useContext } from 'react';
import { GlobalContext } from '@/Context/GlobalContext';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Label,
    Textarea,
    TextInput,
} from 'flowbite-react';

import { HiPencilAlt, HiTrash, HiXCircle } from 'react-icons/hi';

const ShowBook = () => {
    const {
        selectedBook,
        modalBookCreate, setModalBookCreate,
        modalBookShow, setModalBookShow,
        modalBookUpdate, setModalBookUpdate,
        modalBookDelete, setModalBookDelete,
        modalBookSearch, setModalBookSearch,
    } = useContext(GlobalContext);

    if (!selectedBook) return null;

    return (
        <Modal
            show={modalBookShow}
            onClose={() => setModalBookShow(false)}
            size="lg"
            dismissible
        >
            <div className="rounded-xl border-4 border-blue-500">
                <ModalHeader className="dark:bg-gray-700">
                    Show Book
                </ModalHeader>

                <ModalBody className="dark:bg-gray-800 space-y-6">

                    {/* Image */}
                    <div className="flex justify-center">
                        <img
                            src={
                                selectedBook.filename
                                    ? `/books/image/${selectedBook.filename}`
                                    : '/image/book1.jpg'
                            }
                            alt={selectedBook.title}
                            className="h-40 w-40 rounded-md object-contain bg-gray-50 shadow-sm"
                            onError={(e) => {
                                e.target.src = '/image/book1.jpg';
                            }}
                        />
                    </div>

                    {/* Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <div>
                            <Label>Book Title</Label>
                            <TextInput
                                value={selectedBook.title}
                                readOnly
                                disabled
                            />
                        </div>

                        <div>
                            <Label>Author</Label>
                            <TextInput
                                value={selectedBook.author}
                                readOnly
                                disabled
                            />
                        </div>

                        <div>
                            <Label>Category</Label>
                            <TextInput
                                value={selectedBook.category}
                                readOnly
                                disabled
                            />
                        </div>

                        <div>
                            <Label>Price</Label>
                            <TextInput
                                value={`€ ${selectedBook.price === null ? '0.00' : selectedBook.price}`}
                                readOnly
                                disabled
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <Label>Details</Label>
                            <Textarea
                                rows={3}
                                value={selectedBook.detail || ''}
                                readOnly
                                disabled
                            />
                        </div>

                    </div>
                </ModalBody>

                <ModalFooter className="flex justify-between gap-3 dark:bg-gray-800">

                    {/* Left side */}
                    <Button
                        color="red"
                        onClick={() => {
                            setModalBookDelete(true);
                        }}
                    >
                        <HiTrash className="mr-2 h-4 w-4" />
                        Delete
                    </Button>

                    {/* Right side */}
                    <div className="flex gap-2">
                        <Button
                            color="blue"
                            onClick={() => {
                                setModalBookShow(false);
                                setModalBookUpdate(true);
                            }}
                        >
                            <HiPencilAlt className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <Button
                            color="gray" className="hidden md:inline-flex"
                            onClick={() => setModalBookShow(false)}
                        >
                            <HiXCircle className="mr-2 h-4 w-4" />
                            Close
                        </Button>
                    </div>

                </ModalFooter>
            </div>
        </Modal>
    );
};

export default React.memo(ShowBook);
