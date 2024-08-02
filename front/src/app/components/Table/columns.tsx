"use client"
 
import { ColumnDef } from "@tanstack/react-table"

export type Client = {
  id: string
  name:string
  surName: string
  email: string
  birthDate: string  
  address: string
  phone:number
}
 
export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "surName",
    header: "Sobrenome",
  },
  {
    accessorKey: "birthDate",
    header: "Data de Nascimento",
  },

  {
    accessorKey: "address",
    header: "Endereço",
  },

  {
    accessorKey: "phone",
    header: "Telefone",
  },

]