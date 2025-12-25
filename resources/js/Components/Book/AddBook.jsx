import React, { useContext, useState } from 'react';
import { GlobalContext } from '@/Context/GlobalContext';
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
import { HiOutlinePlusCircle, HiOutlineUpload } from 'react-icons/hi';

const AddBook = () => {
  const { filteredBook } = useContext(GlobalContext);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <SidebarItem
        href="#"
        icon={HiOutlinePlusCircle}
        color="blue"
        onClick={() => setOpen(true)}
      >
        Add
      </SidebarItem>

      <Modal
        show={isOpen}
        onClose={() => setOpen(false)}
        dismissible
        size="lg"
      >
        {/* Add blue border around modal */}
        <div className="rounded-xl border-4 border-blue-500 dark:border-blue-400 overflow-hidden">
          <ModalHeader className="dark:bg-gray-00">
            Add Book
          </ModalHeader>

          <ModalBody className="dark:bg-gray-800">
            <form className="space-y-6">
              {/* Book Info */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bookName">Book Name</Label>
                  <TextInput id="bookName" placeholder="Book Name" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="author">Author</Label>
                  <TextInput id="author" placeholder="Author" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="originalPrice">Original Price</Label>
                  <TextInput id="originalPrice" placeholder="€ 0.00" />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="price">New Price</Label>
                  <TextInput id="price" placeholder="€ 0.00" />
                </div>

                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Label htmlFor="details">Book Details</Label>
                  <Textarea
                    id="details"
                    rows={5}
                    placeholder="Write a short description..."
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="mt-4 flex w-full items-center justify-center">
                <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                  <HiOutlineUpload className="h-10 w-10 text-gray-400" />
                  <p className="py-1 text-sm text-gray-600 dark:text-gray-500 text-center">
                    Upload a file or drag & drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </form>
          </ModalBody>

          <ModalFooter className="flex justify-end gap-3 dark:bg-gray-800">
            <Button color="gray" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="blue" onClick={() => setOpen(false)}>
              Add Book
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(AddBook);
