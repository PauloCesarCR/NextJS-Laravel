"use client"
import 'react-multi-carousel/lib/styles.css';
import { ClientWithCards } from '@/requests/ClientWithCards';
import { AddCardModal } from "../AddCardModal/addCardModal";
import DeleteClientModal from "../DeleteClientModal/deleteClientModal";
import CreditCard from "../CreditCard/creditCard";
import { getClientAndCards } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { phoneMask } from '@/utils/masks';

interface IDetailsClientProp {
  client: ClientWithCards
}
const DetailsClient = ({client}: IDetailsClientProp) => {

  const { data } = useQuery({
    queryKey: ['clientWithCards'],
    queryFn: ()=> getClientAndCards(client.id),
    initialData: client,
  })


  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className="m-10">
        <h1 className="text-3xl font-bold">Detalhes do Cliente</h1>
      </div>

      <div className="text-left text-xl">
        <p>Nome: {data.name}</p>
        <p>Sobrenome: {data.surName}</p>
        <p>Email: {data.email}</p>
        <p>Endereço: {data.address}</p>
        <p>Telefone: {phoneMask(data.phone.toString())}</p>
      </div>

      <DeleteClientModal clientId={data.id}  />

      
      <div className="w-full flex flex-col justify-center items-center mt-10 gap-10">
      {data.credit_card.length > 0 && <h1 className="font-bold text-3xl">Cartões do Cliente</h1> }
        <div className="w-full h-full flex flex-wrap justify-center gap-2">
        {data.credit_card.length > 0 ? data.credit_card.map((card:any)=>(
            <CreditCard key={card.id} id={card.id} surName={client.surName} name={client.name} number={card.number} expiration_date={card.expiration_date} cvv={card.cvv}/>
        )): 
       <h1 className="text-2xl lg:text-3xl text-center mt-10 font-bold">Esse usuário não possui cartões cadastrados em nosso sistema.</h1>
    }
      </div>
    </div>

      <AddCardModal client={client} clientId={data.id} />
    </div>
  )
};

export default DetailsClient;
