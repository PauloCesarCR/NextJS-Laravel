"use client"

import { deleteClient } from "@/api/api";
import { Button } from "../ui/button";
import { useState } from "react";
import Modal from 'react-modal';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

interface IDeletarClientModal {
  clientId: string
}
const DeletarClientModal = ({clientId}: IDeletarClientModal) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

  async function removeClient(){

    try {
        await deleteClient(clientId);
        router.push('/');
    } catch (error: any) {
        toast.error(error.message)
    }
  }
  return (
    <div className="w-full flex justify-center mt-10">

        <Button size='sm' onClick={openModal} className="ml-2 bg-red-500">Remover Cliente</Button>

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className=" flex justify-center items-center h-screen "
        >
        <div className="flex justify-center flex-col  bg-black w-1/2 lg:w-1/3 p-10 rounded-xl">   
            <div className="flex justify-between items-center gap-3 mb-5">
              <h1 className=" text-xs lg:text-xl text-white text-center">Você deseja remover esse cliente?</h1>
              <Button onClick={closeModal} className="bg-red-300" variant="outline" size="sm">X</Button>
            </div>
            <div className="flex justify-center flex-col gap-2">
                <Button className="text-green-500 bg-white" onClick={()=> removeClient()} size="sm">Sim</Button>
                <Button onClick={closeModal} className="text-red-500 bg-white" size="sm">Não</Button>
            </div>
            
        </div>
      </Modal>
    </div>
  )
};

export default DeletarClientModal;
