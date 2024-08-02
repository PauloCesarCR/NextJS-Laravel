<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\CreditCard;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{


    public function index(): JsonResponse
    {   

        try {
            $clients = Client::all();
            
            return response()->json([
                'status' => true,
                'clients' => $clients ,
            ], 200);
            
        }catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e,
            ], 400);
        }
      
    }

    public function showClientWithCards(Client $client): JsonResponse
    {

        try {
            $client->load('CreditCard');

            return response()->json([
                'status' => true,
                'client' => $client,
            ], 200);
        
        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e,
            ], 400);
        }
    }

        

    public function store(ClientRequest $request): JsonResponse
    {
   
        DB::beginTransaction();

        try {

            $client = Client::create([
                'name' => $request->name,
                'email' => $request->email,
                'surName' => $request->surName,
                'birthDate' => $request -> birthDate,
                'address' => $request -> address,
                'phone' => $request -> phone,
            ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'client' => $client,
                'message' => "Usuário cadastrado com sucesso!",
            ], 201);
        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e,
            ], 400);
        }
    }

    public function update(ClientRequest $request, Client $client): JsonResponse
    {

        DB::beginTransaction();

        try {

            $client->update([
                'name' => $request->name,
                'email' => $request->email,
                'surName' => $request->surName,
                'birthDate' => $request -> birthDate,
                'address' => $request -> adress,
                'phone' => $request -> phone,
            ]);

            DB::commit();


            return response()->json([
                'status' => true,
                'client' => $client,
                'message' => "Usuário editado com sucesso!",
            ], 200);
        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => "Usuário não editado!",
            ], 400);
        }
    }

    public function destroy(Client $client): JsonResponse
    {
        DB::beginTransaction();
        
        try {

            CreditCard::where('client_id', $client -> id)->delete();
            $client->delete();
            DB::commit();
            
            return response()->json([
                'status' => true,
                'client' => $client,
                'message' => "Usuário apagado com sucesso!",
            ], 200);


        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => "Usuário não apagado!",
            ], 400);
        }
    }
}
