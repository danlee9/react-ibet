<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('league');
            $table->string('home_team');
            $table->string('away_team');
            $table->string('home_moneyline');
            $table->string('away_moneyline');
            $table->string('home_pointspread');
            $table->string('away_pointspread');
            $table->string('home_pointodds');
            $table->string('away_pointodds');
            $table->string('overunder');
            $table->string('overodds');
            $table->string('underodds');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
