<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->uuid('id') -> primary();
            $table->string('name');
            $table->string('surName');
            $table->string('email')-> unique();
            $table->string('birthDate');
            $table->string('address');
            $table->bigInteger('phone') -> max(11);
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
