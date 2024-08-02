"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { toast } from 'react-hot-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { cardFormSchema } from "@/utils/formClientSchema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreditCardRequest } from "@/requests/cardModelRequest"
import Modal from 'react-modal';
import { useState } from "react"
import { useMask , unformat} from "@react-input/mask"
import { PostCreditCard } from "@/api/api"

interface IAddCard {
    clientId: string
    client: any
}

export function AddCardModal({clientId}: IAddCard) {
    
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const cardMaskRef = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
  const expirationDateRef = useMask({ mask: '__/__', replacement: { _: /\d/ } });
  const cvvMask = useMask({ mask: '___', replacement: { _: /\d/ } })
  const queryClient = useQueryClient();
  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
        number: "",
        client_id: "",
        expiration_date: "",
        cvv: "",
    },
  })

  
  const mutation = useMutation({
    mutationFn: (newObj: CreditCardRequest) => PostCreditCard(newObj),
    onSuccess: () => {
      toast.success("Cartão adicionado com sucesso")
      queryClient.invalidateQueries(); 
    },
    onError: () => {
  
    },
  });
 
  async function onSubmit(data: z.infer<typeof cardFormSchema>) {

    try {
      const newObj = {...data, number: Number(unformat(data.number, { mask: '____ ____ ____ ____', replacement: { _: /\d/ } })), cvv: Number(data.cvv) , client_id: clientId}
      mutation.mutate(newObj);
    } catch (error: any) {
      toast.error(error.message)
    }
  }
 
  return (

    <div className='w-full'>
        <div className='w-full flex items-center justify-center'>
            <h1 onClick={openModal} className="mt-2 cursor-pointer font-bold p-10">+ Adicionar novo cartão</h1>
        </div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className=" flex justify-center items-center h-screen"
        >
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-11/12 lg:w-1/3  bg-white p-5 lg:p-10 rounded-md">
                <div className="flex justify-around items-center w-full font-bold mb-8">
                    <h1>Adicionar Cartão</h1>
                    <Button onClick={closeModal} className="bg-red-300" variant="outline" size="sm">X</Button>
                </div>
            <FormField 
            control={form.control}
            name="number"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Numero do Cartão</FormLabel>
                <FormControl ref={cardMaskRef}>
                    <Input className="text-black" placeholder="Número" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="expiration_date"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Data de vencimento</FormLabel>
                <FormControl ref={expirationDateRef}>
                    <Input className="text-black" placeholder="Data de vencimento" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
                <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl ref={cvvMask}>
                    <Input className="text-black" placeholder="CVV" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
              <Button className="w-6/12 h-0 p-3 mt-2" type="submit">Adicionar</Button>
            </form>
          </Form>
        
        </Modal>
    </div>
  )
}