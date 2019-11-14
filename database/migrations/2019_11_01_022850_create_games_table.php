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
            $table->string('home_moneyline')->nullable()->default(null);
            $table->string('away_moneyline')->nullable()->default(null);
            $table->string('home_point_spread')->nullable()->default(null);
            $table->string('away_point_spread')->nullable()->default(null);
            $table->string('home_point_odds')->nullable()->default(null);
            $table->string('away_point_odds')->nullable()->default(null);
            $table->string('over_under')->nullable()->default(null);
            $table->string('over_odds')->nullable()->default(null);
            $table->string('under_odds')->nullable()->default(null);
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
