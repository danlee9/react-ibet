<?php

namespace App\Console\Commands;

use App\Game;
use App\Team;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class Script extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'script';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Custom Script';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // // added data for new linking table between games and teams
        // $games = Game::all();
        // foreach ($games as $game) {
        //     $game_id = $game->id;
        //     if ($game_id == 1) {
        //         continue;
        //     } else {
        //         $home_team = Team::where('full_name', $game->home_team)->first();
        //         $away_team = Team::where('full_name', $game->away_team)->first();
        //         $home_id = $home_team->id;
        //         $away_id = $away_team->id;
        //         // echo "Game Number {$game_id}: {$away_id} @ {$home_id}".PHP_EOL;
        //         DB::table('game_team')->insert([
        //             ['game_id' => $game_id, 'team_id' => $home_id],
        //             ['game_id' => $game_id, 'team_id' => $away_id]
        //         ]);
        //     }
        // }

        // get all the games that are stuck to be removed
        $from = date('2019-12-06');
        $to = date('2019-12-31');
        $games = Game::whereBetween('created_at', [$from, $to])->get();
        foreach ($games as $game) {
            // print_r($game->game_status);
            $game->game_status = 'completed';
            $game->save();
        }
        print_r('Completed');
    }
}