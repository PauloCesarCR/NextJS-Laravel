<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = false;

    
    protected $fillable = [
        'name',
        'surName',
        'email',
        'birthDate',
        'address',
        'phone'
        
    ];

    public function creditCard()
    {
        return $this->hasMany(CreditCard::class);
    }
}
