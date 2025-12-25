import React, { useContext, useState } from 'react';
import { GlobalContext } from '@/Context/GlobalContext';
import {
    Button,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Textarea,
    TextInput,
    SidebarItem,
} from 'flowbite-react';
import { Link } from '@inertiajs/react';
import { HiTrash, HiPencilAlt, HiOutlineUpload } from 'react-icons/hi';

const EditBook = () => {
    const { selectedBook } = useContext(GlobalContext);
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <SidebarItem icon={HiPencilAlt} onClick={() => setOpen(true)}>
                Edit
            </SidebarItem>

            <Modal show={isOpen} onClose={() => setOpen(false)} size="lg" dismissible>
                <div className="rounded-xl border-4 border-blue-500 dark:border-blue-400 overflow-hidden">

                    <ModalHeader className="dark:bg-gray-700">Edit book</ModalHeader>

                    <ModalBody className="dark:bg-gray-800">
                        <form className="space-y-6">
                            {/* Book details */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    Book information
                                </h3>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="title" value="Book title" />
                                        <TextInput
                                            id="title"
                                            value={selectedBook.title}
                                            placeholder="Book title"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="author" value="Author" />
                                        <TextInput
                                            id="author"
                                            value={selectedBook.author}
                                            placeholder="Author"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div>
                                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    Pricing
                                </h3>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="originalPrice" value="Original price" />
                                        <TextInput
                                            id="originalPrice"
                                            value={selectedBook.originalPrice}
                                            placeholder="€ 0.00"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="price" value="New price" />
                                        <TextInput
                                            id="price"
                                            value={selectedBook.price}
                                            placeholder="€ 0.00"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="details" value="Book details" />
                                <Textarea
                                    id="details"
                                    rows={5}
                                    placeholder="Write a short description..."
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                    Cover image
                                </h3>

                                <div className="flex items-center gap-6">
                                    {/* Preview */}
                                    <div className="relative">
                                        <img
                                            src={selectedBook.image}
                                            alt="Book cover"
                                            className="h-24 w-16 rounded-md object-cover shadow"
                                        />
                                        <button
                                            type="button"
                                            className="absolute -top-2 -right-2 rounded-full bg-red-600 p-1 text-white hover:bg-red-700"
                                        >
                                            <HiTrash className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Upload */}
                                    <label className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                                        <HiOutlineUpload className="mb-2 h-8 w-8 text-gray-400" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Click to upload or drag & drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG up to 10MB
                                        </p>
                                        <input type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter className="flex justify-end gap-3 dark:bg-gray-800">
                        <Button color="gray" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="blue" onClick={() => setOpen(false)}>
                            Save changes
                        </Button>
                    </ModalFooter>
                </div>

            </Modal>
        </>
    );
};

export default React.memo(EditBook);
