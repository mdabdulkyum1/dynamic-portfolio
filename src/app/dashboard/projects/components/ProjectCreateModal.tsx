"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ProjectForm } from "./ProjectForm";

type ProjectCreateModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const ProjectCreateModal = ({ isOpen, closeModal, }:ProjectCreateModalProps ) => {
   
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="container mx-auto transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                                    Add New Project
                                </Dialog.Title>

                                <ProjectForm></ProjectForm>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ProjectCreateModal;