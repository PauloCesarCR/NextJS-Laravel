'use client'
import { mcc } from "@/utils/masks"
import { deleteCreditCard } from "@/api/api"
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ICardProps {
    id: string, 
    name: string,
    surName: string,
    number: string,
    expiration_date: string,
    cvv: number
}

const CreditCard = ({id, name, number,expiration_date,surName, cvv}: ICardProps) => {
  
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, string>({
    mutationFn: () => deleteCreditCard(id),

    onSuccess: () => {
      toast.success("Cartão removido com sucesso")
      queryClient.invalidateQueries(); 
    },
    onError: () => {
      toast.error("Erro ao deletar um cartão")
    },
  });

  
  async function handleRemove(id: string){

    mutation.mutate(id);  
  }

  return (
    <div className="relative w-2/5 lg:w-1/5  p-8 lg:p-2 lg:h-40 bg-black text-white flex flex-col justify-center gap-2 ">
      <p className="text-[0.4rem] lg:text-xs absolute bottom-2 right-2">BANK</p>
      <p className="relative text-[0.6rem] bottom-3 right-3 lg:left-2 mt-2 lg:text-xl">{mcc(number.toString())}</p>
      <div className="flex items-center justify-center gap-1 absolute right-2 lg:absolute lg:right-2">
        <span className="text-[0.15rem]">VALID<br></br>THRU</span>
        <p className="text-[0.35rem] lg:text-xs">{expiration_date}</p>
      </div>
      <p className="text-[0.35rem] absolute bottom-1 left-5 lg:text-sm">{name} {surName}</p>
      <p className="text-[0.2rem] absolute top-2 left-2 lg:text-sm">{cvv}</p>
      <p onClick={() =>  handleRemove(id) } className="w-[0.03rem] absolute right-4 text-red-500 bg-black top-0 cursor-pointer">X</p>
    </div>
  )
};

export default CreditCard;
