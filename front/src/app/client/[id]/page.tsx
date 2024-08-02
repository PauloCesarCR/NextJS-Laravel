import DetailsClient from "@/app/components/DetailsClient/detailsClient";
import { getClientAndCards } from "@/api/api";


const ClientDetailsPage = async ({ params }: { params: { id: string } }) => {

  const client = await getClientAndCards(params.id);

  return (
    <div className="w-full h-full  flex flex-col items-center gap-2">
        <DetailsClient client={client}/>
    </div>
  );
};

export default ClientDetailsPage;