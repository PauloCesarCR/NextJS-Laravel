import { ClientRequest } from "@/requests/clientModelRequest";
import { CreditCardRequest } from "@/requests/cardModelRequest";
import { Client } from "@/app/components/Table/columns";
import { ClientWithCards } from "@/requests/ClientWithCards";

export async function PostClient(RequestBody: ClientRequest): Promise<Client | undefined> {
  
    try {
        const res = await fetch("http://localhost:8000/api/client", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(RequestBody),
        })
       
        const {data} = await res.json()
       
        return data;
        
    } catch (error: any) {
      throw new Error(error)
    }
}
export async function getAllClients(): Promise<Client[]> {

  try {
    const response = await fetch('http://localhost:8000/api/client');
    const {clients} = await response.json();
    return clients;
    
  } catch (error: any) {
    throw new Error(error)
  }

}

export async function deleteClient(clientId: string){

  try {
    const res = await fetch(`http://localhost:8000/api/client/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return res.status;
    
  } catch (error: any) {
    throw new Error(error)
  }

}

export async function getClientAndCards(id: string): Promise<ClientWithCards> {

  try {
    const response = await fetch(`http://localhost:8000/api/client/${id}/cards`);
    const { client } = await response.json();

    return client;
  } catch (error: any) {
    throw new Error(error)
  }
}



export async function PostCreditCard(RequestBody: CreditCardRequest): Promise<CreditCardRequest | undefined> {
  
  try {
      const res = await fetch("http://localhost:8000/api/cards", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(RequestBody),
      })
     
      const {data} = await res.json()
     
      return data;
      
  } catch (error: any) {
      throw new Error(error)
  }
}

export async function deleteCreditCard(creditCardId: string){

  try {
    const res = await fetch(`http://localhost:8000/api/cards/${creditCardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return res.json();
    
  } catch (error: any) {
    throw new Error(error)
  }

}


export async function getAdressCep(cep: string){

  try {
    const res = await fetch(`http://viacep.com.br/ws/${cep}/json`)

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error)
  }

}