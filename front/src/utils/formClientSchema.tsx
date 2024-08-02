import { z } from "zod"

export const clientFormSchema = z.object({
    name: z.string(),
    surName: z.string(),
    email: z.string().email({
      message:"Email inválido"
    }),
    birthDate: z.string(),
  
    cep: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Digite o cep"
    }),
  
    address: z.string(),
  
    phone: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Apenas números"
    }),
})

export const cardFormSchema = z.object({
  number: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Apenas números"
  }),

  client_id: z.string(),
  
  expiration_date: z.string(),
  
  cvv: z.string().min(3).max(3).refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Apenas números"
  }),
  
})