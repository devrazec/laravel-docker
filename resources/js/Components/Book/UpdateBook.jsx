import React, { useContext, useEffect, useRef } from 'react';
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
} from 'flowbite-react';
import { useForm } from '@inertiajs/react';
import { HiOutlineUpload } from 'react-icons/hi';
import { Toast } from 'primereact/toast';

const UpdateBook = () => {
    const {
        selectedBook,
        modalBookUpdate,
        setModalBookUpdate,
    } = useContext(GlobalContext);

    const toast = useRef(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        title: '',
        author: '',
        category: '',
        price: '',
        detail: '',
        filename: null,
        remove_image: false,
    });

    /* 🔹 Prefill form when a book is selected */
    useEffect(() => {
        if (selectedBook) {
            setData({
                title: selectedBook.title || '',
                author: selectedBook.author || '',
                category: selectedBook.category || '',
                price: selectedBook.price || '',
                detail: selectedBook.detail || '',
                filename: null,
                remove_image: false,
            });
        }
    }, [selectedBook]);

    const submit = (e) => {
        e.preventDefault();

       put(route('books.update', selectedBook.id), {
            onSuccess: () => {
                reset();
                setModalBookUpdate(false);

                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Book updated successfully!',
                    life: 5000,
                });
            },
        });
    };

     // Function to reset all form fields
  const resetForm = () => {
    reset(); // Inertia form reset
    setData({
      title: '',
      author: '',
      category: '',
      price: '',
      detail: '',
      filename: null,
    });
    document.getElementById("file-upload").value = null;
  };

    const hasNewImage = data.filename instanceof File;

    const hasExistingImage =
        selectedBook?.filename &&
        !data.remove_image &&
        !hasNewImage;

    const showUploadLabel =
        !hasExistingImage && !hasNewImage;

    return (
        <>
            <Toast ref={toast} position="bottom-right" />

            <Modal show={modalBookUpdate} onClose={() => setModalBookUpdate(false)} size="lg" dismissible>
                <div className="rounded-xl border-4 border-blue-500 overflow-hidden">
                    <ModalHeader className="dark:bg-gray-700">
                        Update Book
                    </ModalHeader>

                    <ModalBody className="dark:bg-gray-800">
                        <form className="space-y-6" onSubmit={submit}>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <Label htmlFor="title">Book Title</Label>
                                    <TextInput
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        color={errors.title && 'failure'}
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="author">Author</Label>
                                    <TextInput
                                        id="author"
                                        value={data.author}
                                        onChange={(e) => setData('author', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <TextInput
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <TextInput
                                        id="price"
                                        value={data.price}
                                        placeholder='0.00'
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <Label htmlFor="detail">Book Details</Label>
                                    <Textarea
                                        id="detail"
                                        rows={2}
                                        value={data.detail}
                                        onChange={(e) => setData('detail', e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* File Upload */}
                            <div
                                className="relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-800 hover:bg-gray-700"
                                onClick={() => document.getElementById('file-upload').click()}
                            >
                                {/* Existing Image */}
                                {hasExistingImage && (
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={`/books/image/${selectedBook.filename}`}
                                            alt="Book cover"
                                            className="h-24 w-24 rounded-md object-cover mb-2"
                                        />
                                        <p className="text-sm text-gray-50">{selectedBook.filename}</p>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setData('remove_image', true);
                                            }}
                                            className="text-sm text-red-500 underline"
                                        >
                                            Remove image
                                        </button>
                                    </div>
                                )}

                                {/* New Image Preview */}
                                {hasNewImage && (
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={URL.createObjectURL(data.filename)}
                                            alt="Preview"
                                            className="h-24 w-24 rounded-md object-cover mb-2"
                                        />
                                        <p className="text-sm text-gray-50">{data.filename.name}</p>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setData('filename', null);
                                            }}
                                            className="text-sm text-red-500 underline"
                                        >
                                            Remove image
                                        </button>
                                    </div>
                                )}

                                {/* Upload Label */}
                                {showUploadLabel && (
                                    <label className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-lg p-6 text-center hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                                        <HiOutlineUpload className="mb-2 h-8 w-8 text-gray-400" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Click to upload or drag & drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG up to 1MB
                                        </p>
                                    </label>
                                )}

                            </div>

                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    setData('filename', file);
                                    setData('remove_image', true);
                                }}
                            />

                            <ModalFooter className="flex justify-end gap-3">
                                <Button
                                    color="gray"
                                    onClick={() => {
                                        resetForm();
                                        setModalBookUpdate(false);
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button color="blue" type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Update Book'}
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </div>
            </Modal>
        </>
    );
};

export default React.memo(UpdateBook);
