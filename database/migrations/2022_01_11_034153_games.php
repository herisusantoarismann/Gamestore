<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Games extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id('game_id');
            $table->unsignedBigInteger('publisher');
            $table->unsignedBigInteger('developer');
            $table->string('genre');
            $table->string('price');
            $table->timestamps();

            $table->foreign('publisher')->references('publisher_id')->on('publishers')->onDelete('SET NULL');
            $table->foreign('developer')->references('developer_id')->on('developers')->onDelete('SET NULL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}