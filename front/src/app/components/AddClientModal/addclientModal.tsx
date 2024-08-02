'use client';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from '../ui/button';

const ClientModal = ({children}: Readonly<{children: React.ReactNode}>) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className='w-full'>
        <div className='w-full flex items-left justify-left'>
            <Button onClick={openModal} className="relative left-4 lg:left-14 bg-white text-black mt-10 mb-3 " variant="outline" size="default">Adiciona novo Cliente</Button>
        </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className=" flex justify-center items-center h-screen "
      >
        
        <Button onClick={closeModal} className="absolute top-10 right-7 lg:right-4" variant="outline" size="default">X</Button>
        {children}
      </Modal>
    </div>
  );
};

export default ClientModal;