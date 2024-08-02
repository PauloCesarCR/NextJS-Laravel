import { CreditCardRequest } from "@/requests/cardModelRequest" 


export type ClientWithCards = {
    id:string
    name:string
    surName: string
    email: string
    birthDate: string  
    address: string
    phone:number
    credit_card: CreditCardRequest[]
}