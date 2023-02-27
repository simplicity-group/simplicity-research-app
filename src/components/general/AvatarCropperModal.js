import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Avatar from 'react-avatar-edit';

const AvatarCropperModal = (props) => {

    const cancelButtonRef = useRef(null)
    const [cropperOpen, setCropperOpen] = props.modalOpen;

    function cancelCrop(){
        setCropperOpen(false); 
        props.setPhotoPreview(props.profilePic);
        props.setProfileChanged(false);
    } 
    
    function submitCrop(){
        setCropperOpen(false); 
        props.setProfileChanged(true);
    }

    const onCrop = view =>{
        props.setPhotoPreview(view)
        props.setPhoto(view);
    }


    return (
        <div>
            <Transition.Root show={cropperOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={cancelCrop}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                    <div className="flex justify-center bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <Avatar 
                        imageWidth={350}
                        onCrop={onCrop}
                        />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-black text-white py-2 px-4 text-base font-medium text-white shadow-sm hover:shadow-md hover:border-gray-400 hover:bg-gray-900  focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => submitCrop()}
                        >
                        Crop
                        </button>
                        <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => cancelCrop()}
                        ref={cancelButtonRef}
                        >
                        Cancel
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition.Root>
        </div>
  )
}

export default AvatarCropperModal
