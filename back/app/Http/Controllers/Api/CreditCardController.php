<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreditCardRequest;
use App\Models\CreditCard;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class CreditCardController extends Controller
{
 

    public function store(CreditCardRequest $request): JsonResponse
    {
        
        DB::beginTransaction();

        try {
            $creditCard = CreditCard::create([
                'client_id' => $request->client_id,
                'number' => $request->number,
                'expiration_date' => $request -> expiration_date,
                'cvv' => $request -> cvv,
    
            ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'card' => $creditCard,
                'message' => "Cartão cadastrado com sucesso!",
            ], 201);
        } catch (Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => $e,
            ], 400);
        }
    }


    public function destroy(CreditCard $creditCard): JsonResponse
    {
        DB::beginTransaction();
        
        try {
            
            CreditCard::where('id', $creditCard -> id)->delete();
            DB::commit();
            
            return response()->json([
                'status' => true,
                'message' => "Cartão apagado com sucesso!",
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
