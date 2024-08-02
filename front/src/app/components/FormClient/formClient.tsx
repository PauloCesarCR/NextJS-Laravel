"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { useMask , unformat} from '@react-input/mask';
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
import { clientFormSchema } from "@/utils/formClientSchema"
import { ClientRequest } from "@/requests/clientModelRequest"
import { PostClient } from "@/api/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getAdressCep } from "@/api/api"
import { useState } from "react"
import { CepResponse } from "@/requests/viaCepResponse"

export function InputForm() {
  const [adress, setAdress] = useState('')
  const maskPhone = { mask: '+55 (__) _____-____', replacement: { _: /\d/ } }
  const MaskCep ={ mask: '_____-___', replacement: { _: /\d/ } }

  const PhoneInputRef = useMask(maskPhone);
  const CepInputRef = useMask(MaskCep);

  const form = useForm<z.infer<typeof clientFormSchema>>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
        name: "",
        surName: "",
        email: "",
        birthDate: "",
        cep: "",
        address: "",
        phone: ""
    },
  })
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (newObj: ClientRequest) => PostClient(newObj),
    onSuccess: () => {
      toast.success("Cliente adicionado com sucesso")
      queryClient.invalidateQueries(); 
    },
    onError: () => {
      toast.error("Erro ao adicionar um cliente")
    },
  });
  

  async function getAdress(value:string){
    const valueUnFormat = unformat(value, MaskCep);
    if(valueUnFormat.length == 8){
      const data: CepResponse = await getAdressCep(valueUnFormat);
  
      if(data){
        setAdress(data.logradouro + " - " + data.bairro + " - " + data.localidade)
      } 
    return;
  }
  }
  async function onSubmit(data: z.infer<typeof clientFormSchema>) {

      let newObj: ClientRequest = {name: data.name, surName: data.surName, email: data.email, 
      birthDate: data.birthDate, address: adress, phone: Number(unformat(data.phone,maskPhone))}
        console.log(newObj)
      mutation.mutate(newObj);
   
  }
 
  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-11/12 lg:w-1/3  bg-white p-5 lg:p-10 rounded-md">
        <div className="flex justify-center w-full font-bold">
            <h1>Adicionar Cliente</h1>
        </div>
        <FormField 
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input className="text-black" placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="surName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input className="text-black" placeholder="Sobrenome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="text-black" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento </FormLabel>
              <FormControl>
                <Input className="text-black" type="date" placeholder="BirthDate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (  
            <FormItem>
              <FormLabel>Cep</FormLabel>
              <FormControl onChange={(e: React.ChangeEvent<HTMLInputElement>) => getAdress(e.target.value)} ref={CepInputRef}> 
                <Input className="text-black" placeholder="Cep" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={() => (  
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input defaultValue={adress} className="text-black" placeholder="Rua ..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (  
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl ref={PhoneInputRef}>
                <Input className="text-black" placeholder="Telefone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-6/12 h-0 p-3 mt-2" type="submit">Adicionar</Button>
      </form>
    </Form>
  )
}