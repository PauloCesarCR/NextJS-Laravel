
import { InputForm } from "@/app/components/FormClient/formClient";

import { GetStaticPaths } from "next";
import { DataTable } from "./components/Table/data-table";
import { Client, columns } from "./components/Table/columns"
import { getAllClients } from "@/api/api";
import ClientModal from "./components/AddClientModal/addclientModal";

export const getStaticPaths: GetStaticPaths = async () => {
  
  try {
    const data = await getAllClients()
    const paths = data.map((client: Client) => ({
      params: { id: client.id.toString() },
    }));
  
    return {
      paths,
      fallback: false, 
    };
    
  } catch (error) {
    return { paths: [], fallback: false }
  }
};

export default async function Home() {

  const clients = await getAllClients();

  return (
    <main className="flex w-full flex-col  justify-center ">
      <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mt-10">Lista de Clientes</h1>
          <div className="flex flex-col  w-screen justify-center items-center">
            <ClientModal children={<InputForm />} />
            <div className="w-full flex justify-center mx-auto ">
              <DataTable columns={columns} clients={clients} />
            </div>
          {/* <InputForm /> */}
          </div>
      </div>


    </main>
  );
}
