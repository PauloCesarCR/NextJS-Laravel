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
            'number' => 'required|min:16|max:16',
            'expiration_date' => 'required|min:4|max:5',
            'client_id' => 'required',
            'cvv' => 'required',
     
        ];
    }

    
    public function messages(): array
    {
        return [
            'number.required' => 'O número do cartão é obrigatório!',
            'number.min' => 'Um cartão de crédito possui 16 dígitos',
            'number.max' => 'Um cartão de crédito possui 16 dígitos',
            'expiration_date.required' => 'A data de validade é obrigatória',
            'expiration_date.min' => 'Data de validade deve possuir 4 digitos',
            'expiration_date.max' => 'Data de validade deve possuir 4 digitos',
            'cvv.required' => 'CVV é obrigatório!',
        ];
    }
}
