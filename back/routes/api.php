<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CreditCardController;


Route::get('/client/{client}/cards', [ClientController::class, 'showClientWithCards']);
Route::get('/client', [ClientController::class, 'index']);
Route::post('/client', [ClientController::class, 'store']);
Route::put('/client/{client}', [ClientController::class, 'update']);
Route::delete('/client/{client}', [ClientController::class, 'destroy']);

Route::post('/cards', [CreditCardController::class, 'store']);
Route::delete('/cards/{creditCard}', [CreditCardController::class, 'destroy']);