import React, { useState, useRef, useEffect, useContext } from 'react';
import { GlobalContext } from '@/Context/GlobalContext';
import { Link, useForm, usePage } from '@inertiajs/react';
import {
  SidebarItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  TextInput,
  Textarea,
  Button,
} from 'flowbite-react';
import { HiOutlinePlusCircle, HiTrash, HiOutlineUpload, HiXCircle, HiCheckCircle } from 'react-icons/hi';
import { Toast } from 'primereact/toast';

const CreateBook = () => {

  const { mode, themeMode, dataBook, setDataBook, totalBook, filteredBook,
    modalBookCreate, setModalBookCreate,
    modalBookShow, setModalBookShow,
    modalBookUpdate, setModalBookUpdate,
    modalBookDelete, setModalBookDelete,
    modalBookSearch, setModalBookSearch,
  } = useContext(GlobalContext);

  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    author: '',
    category: '',
    price: '',
    detail: '',
    filename: null,
  });

  const toast = useRef(null);

  const submit = (e) => {
    e.preventDefault();

    post('/books', {
      onSuccess: () => {
        reset();
        setModalBookCreate(false);

        toast.current.show({
          severity: 'success',
          summary: 'Success',
          detail: 'Book created successfully!',
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

  return (
    <>
      <Toast ref={toast} position="bottom-right" />

      <Modal show={modalBookCreate} onClose={() => setModalBookCreate(false)} dismissible size="lg">
        <div className="rounded-xl border-4 border-blue-500 overflow-hidden">
          <ModalHeader className="dark:bg-gray-700">Create Book</ModalHeader>
          
          <form onSubmit={submit}>

            <ModalBody className="dark:bg-gray-800 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Book Title</Label>
                  <TextInput
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    color={errors.title && 'failure'}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
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
                    onChange={(e) => setData('price', e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label htmlFor="detail">Details</Label>
                  <Textarea
                    id="detail"
                    rows={2}
                    value={data.detail}
                    onChange={(e) => setData('detail', e.target.value)}
                  />
                </div>
              </div>

              {/* File Upload */}
              {/* File Upload with Drag & Drop */}
              {/* File Upload with Drag & Drop + Thumbnail */}
              {/* File Upload with Drag & Drop + Thumbnail + Remove Button */}
              <div className="flex justify-center">
                <div
                  className={`relative flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors
      ${data.filename && data.filename.size > 1000000 ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-800 hover:bg-gray-700'}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (!file) return;

                    if (file.size > 1000000) {
                      alert("File size exceeds 1 MB.");
                      setData("filename", null);
                      return;
                    }

                    setData("filename", file);
                  }}
                  onClick={() => document.getElementById("file-upload").click()}
                >
                  {!data.filename ? (
                    <>

                      <label className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-lg p-6 text-center hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                        <HiOutlineUpload className="mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Click to upload or drag & drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 1MB
                        </p>
                      </label>

                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      {data.filename.type.startsWith("image/") && (
                        <img
                          src={URL.createObjectURL(data.filename)}
                          alt="preview"
                          className="h-24 w-54 object-cover rounded-md mb-2"
                        />
                      )}
                      <p className="text-sm text-gray-50">{data.filename.name}</p>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent triggering file dialog
                          setData("filename", null);
                          document.getElementById("file-upload").value = null;
                        }}
                        className="mt-2 text-sm text-red-500 underline"
                      >
                        Remove file
                      </button>
                    </div>
                  )}
                </div>

                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    if (file.size > 1000000) {
                      alert("File size exceeds 1 MB.");
                      e.target.value = null;
                      setData("filename", null);
                      return;
                    }

                    setData("filename", file);
                  }}
                />

                {errors.filename && (
                  <p className="text-sm text-red-500 mt-2">{errors.filename}</p>
                )}
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-end gap-3 dark:bg-gray-800">

              {/* Left side */}

              <div className="flex gap-2">
                <Button color="blue" type="submit" disabled={processing}>
                  <HiCheckCircle className="mr-2 h-4 w-4" />
                  {processing ? 'Saving...' : 'Save'}
                </Button>
                <Button color="gray"
                  onClick={() => {
                    resetForm();
                    setModalBookCreate(false);
                  }}>
                  <HiXCircle className="mr-2 h-4 w-4" />
                  Close
                </Button>
              </div>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(CreateBook);
