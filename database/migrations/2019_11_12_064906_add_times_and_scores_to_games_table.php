<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTimesAndScoresToGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('games', function (Blueprint $table) {
            $table->unsignedBigInteger('unix_start_time')->after('away_team')->nullable()->default(null);
            $table->unsignedTinyInteger('home_score')->after('under_odds')->nullable()->default(null);
            $table->unsignedTinyInteger('away_score')->after('home_score')->nullable()->default(null);
            $table->string('game_status')->after('away_score')->default('pending');
            $table->boolean('non_home_stadium')->after('game_status')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('games', function (Blueprint $table) {
            $table->removeColumn('unix_start_time');
            $table->removeColumn('home_score');
            $table->removeColumn('away_score');
            $table->removeColumn('game_status');
            $table->removeColumn('non_home_stadium');
        });
    }
}
