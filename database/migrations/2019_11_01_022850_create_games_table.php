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
            $table->double('home_moneyline', 5, 3)->nullable()->default(null);
            $table->double('away_moneyline', 5, 3)->nullable()->default(null);
            $table->double('home_point_spread', 3, 1)->nullable()->default(null);
            $table->double('away_point_spread', 3, 1)->nullable()->default(null);
            $table->double('home_point_odds', 5, 3)->nullable()->default(null);
            $table->double('away_point_odds', 5, 3)->nullable()->default(null);
            $table->double('over_under', 4, 1)->nullable()->default(null);
            $table->double('over_odds', 5, 3)->nullable()->default(null);
            $table->double('under_odds', 5, 3)->nullable()->default(null);
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
