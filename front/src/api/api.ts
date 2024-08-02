import { ClientRequest } from "@/requests/clientModelRequest";
import { CreditCardRequest } from "@/requests/cardModelRequest";
import { Client } from "@/app/components/Table/columns";
import { ClientWithCards } from "@/requests/ClientWithCards";
import toast from "react-hot-toast";


interface ErrorResponse {
  erros: {
    [key: string]: string[];
  };
  status: boolean;
}

export async function PostClient(RequestBody: ClientRequest): Promise<Client | undefined> {
    
    const res = await fetch("http://localhost:8000/api/client", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(RequestBody),
    })

    
    if (!res.ok) {
      const errorData: ErrorResponse = await res.json();
      const keys:string[] = Object.keys(errorData.erros);
      const keyOne:string = keys[0] as string;

      toast.error(errorData.erros[keyOne][0])
      return;
    }
  
    const {data} = await res.json()
  
    return data;
        
}

export async function getAllClients(): Promise<Client[]> {

    const res = await fetch('http://localhost:8000/api/client');


    if (!res.ok) {
      const errorData: ErrorResponse = await res.json();
      const keys:string[] = Object.keys(errorData.erros);
      const keyOne:string = keys[0] as string;

      toast.error(errorData.erros[keyOne][0])
    }

    const {clients} = await res.json();
    return clients;
    
}

export async function deleteClient(clientId: string){

    const res = await fetch(`http://localhost:8000/api/client/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!res.ok) {
      const errorData: ErrorResponse = await res.json();
      const keys:string[] = Object.keys(errorData.erros);
      const keyOne:string = keys[0] as string;

      toast.error(errorData.erros[keyOne][0])
    }

    return res.json();

}

export async function getClientAndCards(id: string): Promise<ClientWithCards> {

    const res = await fetch(`http://localhost:8000/api/client/${id}/cards`);
    const { client } = await res.json();


    if (!res.ok) {
      const errorData: ErrorResponse = await res.json();
      const keys:string[] = Object.keys(errorData.erros);
      const keyOne:string = keys[0] as string;

      toast.error(errorData.erros[keyOne][0])
    }

    return client;

}



export async function PostCreditCard(RequestBody: CreditCardRequest): Promise<CreditCardRequest> {
  

      const res = await fetch("http://localhost:8000/api/cards", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(RequestBody),
      })
      

      if (!res.ok) {
        const errorData: ErrorResponse = await res.json();
        const keys:string[] = Object.keys(errorData.erros);
        const keyOne:string = keys[0] as string;
  
        toast.error(errorData.erros[keyOne][0])
      }

      const {data} = await res.json()
      return data;
      
}

export async function deleteCreditCard(creditCardId: string){


    const res = await fetch(`http://localhost:8000/api/cards/${creditCardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!res.ok) {
      const errorData: ErrorResponse = await res.json();
      const keys:string[] = Object.keys(errorData.erros);
      const keyOne:string = keys[0] as string;

      toast.error(errorData.erros[keyOne][0])
    }

    return res.json();
    
}


export async function getAdressCep(cep: string){

    const res = await fetch(`http://viacep.com.br/ws/${cep}/json`)

    const data = await res.json();
    return data;

}