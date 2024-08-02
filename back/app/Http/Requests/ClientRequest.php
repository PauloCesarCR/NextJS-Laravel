<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class ClientRequest extends FormRequest
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
        $clientId = $this->route('client');
        
        return [
            'name' => 'required',
            'surName' => 'required',
            'email' => [
                'required',
                'email',
                Rule::unique('clients')->ignore($clientId, 'uuid')
            ],
            'birthDate' => 'required',
            'address',
            'phone' => 'required'
        ];
    }

    
    public function messages(): array
    {
        return [
            'name.required' => 'Campo nome é obrigatório!',
            'surName.required' => 'O sobrenome é obrigatório',
            'email.required' => 'Campo e-mail é obrigatório!',
            'email.email' => 'Necessário enviar e-mail válido!',
            'email.unique' => 'O e-mail já está cadastrado!',
            'birthDate.required' => 'A data de nascimento é obrigatória',
            'phone.digits' => 'Formato do número 0011973264787',
        ];
    }
}
