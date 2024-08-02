<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class CreditCardRequest extends FormRequest
{
 
    public function authorize(): bool
    {
        return true;
    }


    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'status' => false,
            'erros' => $validator->errors(),
        ], 422)); 
    }


    public function rules(): array
    {
       
        return [
            'number' => 'required',
            'expiration_date' => 'required',
            'client_id' => 'required',
            'cvv' => 'required',
     
        ];
    }

    
    public function messages(): array
    {
        return [
            'number.required' => 'O número é obrigatório!',
            'expiration_date.required' => 'A data de validade é obrigatória',
            'cvv.required' => 'CVV é obrigatório!',
        ];
    }
}
