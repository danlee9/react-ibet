<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;
use App\Team;
use App\Http\Controllers\ThirdPartyServicesController as ThirdParty;
use App\Transaction;
use App\User;
use Illuminate\Support\Facades\DB;


class GameController extends Controller
{
    public function updateMoneylines($league)
    {
        $thirdParty = new ThirdParty;
        $games = $thirdParty->getMoneyLines($league);
        foreach ($games as $game) {
            $home_team = $game['home_team'];
            $away_team = $game['away_team'];
            $insert = Game::updateOrCreate(
                ['home_team' => $home_team, 'away_team' => $away_team, 'game_status' => 'pending'],
                ['league' => $league, 'unix_start_time' => $game['unix_start_time'], 'home_moneyline' => $game['home_moneyline'], 'away_moneyline' => $game['away_moneyline']]
            );
            $game_id = $insert->id;
            $home_team_data = Team::where('full_name', $home_team)->first();
            $away_team_data = Team::where('full_name', $away_team)->first();
            $home_id = $home_team_data->id;
            $away_id = $away_team_data->id;
            if (!DB::table('game_team')->where('game_id', $game_id)->where('team_id', $home_id)->exists()) {
                print_r('New game added'.PHP_EOL);
                DB::table('game_team')->insert([
                    ['game_id' => $game_id, 'team_id' => $home_id],
                    ['game_id' => $game_id, 'team_id' => $away_id]
                ]);
            }
        }
        print_r("MONEYLINE".PHP_EOL);
    }

    public function updatePointSpreads($league)
    {   
        $thirdParty = new ThirdParty;
        $games = $thirdParty->getPointSpreads($league);
        foreach ($games as $game) {
            $home_team = $game['home_team'];
            $away_team = $game['away_team'];
            $insert = Game::updateOrCreate(
                ['home_team' => $home_team, 'away_team' => $away_team, 'game_status' => 'pending'],
                ['league' => $league, 'unix_start_time' => $game['unix_start_time'], 'home_point_spread' => $game['home_point_spread'], 'away_point_spread' => $game['away_point_spread'], 'home_point_odds' => $game['home_point_odds'], 'away_point_odds' => $game['away_point_odds']]
            );
            $game_id = $insert->id;
            $home_team_data = Team::where('full_name', $home_team)->first();
            $away_team_data = Team::where('full_name', $away_team)->first();
            $home_id = $home_team_data->id;
            $away_id = $away_team_data->id;
            if (!DB::table('game_team')->where('game_id', $game_id)->where('team_id', $home_id)->exists()) {
                print_r('New game added'.PHP_EOL);
                DB::table('game_team')->insert([
                    ['game_id' => $game_id, 'team_id' => $home_id],
                    ['game_id' => $game_id, 'team_id' => $away_id]
                ]);
            }
        }
        print_r("SPREADSSSSSSSS".PHP_EOL);
    }

    public function updateOverUnders($league)
    {

        $thirdParty = new ThirdParty;
        $games = $thirdParty->getOverUnders($league);
        foreach ($games as $game) {
            $home_team = $game['home_team'];
            $away_team = $game['away_team'];
            $insert = Game::updateOrCreate(
                ['home_team' => $home_team, 'away_team' => $away_team, 'game_status' => 'pending'],
                ['league' => $league, 'unix_start_time' => $game['unix_start_time'], 'over_under' => $game['over_under'], 'over_odds' => $game['over_odds'], 'under_odds' => $game['under_odds']]
            );
            $game_id = $insert->id;
            $home_team_data = Team::where('full_name', $home_team)->first();
            $away_team_data = Team::where('full_name', $away_team)->first();
            $home_id = $home_team_data->id;
            $away_id = $away_team_data->id;
            if (!DB::table('game_team')->where('game_id', $game_id)->where('team_id', $home_id)->exists()) {
                print_r('New game added'.PHP_EOL);
                DB::table('game_team')->insert([
                    ['game_id' => $game_id, 'team_id' => $home_id],
                    ['game_id' => $game_id, 'team_id' => $away_id]
                ]);
            }
        }
        print_r("TOTALLSSSSS".PHP_EOL);
    }

    public function updateScores($league)
    {
        $thirdParty = new ThirdParty;
        $games = $thirdParty->getCompletedGames($league);
        foreach ($games as $game) {
            if ($game['home_score'] && $game['away_score']) {
                $dbEntry = Game::where('home_team', $game['home_team'])->where('away_team', $game['away_team'])->where('game_status', 'pending')->first();
                if (!$dbEntry) {
                    $dbEntry = Game::where('home_team', $game['home_team'])->where('away_team', $game['away_team'])->where('game_status', 'marked')->first();
                    // print_r($game);
                    // print_r("<br>");
                }
                if ($dbEntry) {
                    print_r("Updating scores with home team {$game['home_team']}".PHP_EOL);
                    print_r("<br>");
                    $dbEntry->update([
                        'home_score' => $game['home_score'],
                        'away_score' => $game['away_score'],
                        'game_status' => 'completed'
                    ]);
                    $bets = $dbEntry->bets;
                    foreach ($bets as $bet) {
                        // $game = $bet->game;
                        // $home_score = $game->home_score;
                        // $away_score = $game->away_score;
                        // if ($bet->team === $game->home_team) {
                        //     $chosen_score = $home_score;
                        //     $opposing_score = $away_score;
                        // } else {
                        //     $chosen_score = $away_score;
                        //     $opposing_score = $home_score;
                        // }
                        // print_r($chosen_score);
                        // print_r("<br>");
                        // print_r($opposing_score);
                        // print_r("<br>");
                        // print_r($bet->point_spread);
                        // print_r("<br>");
                        // exit();
                        $bet->gradeBet();
                        $wager = $bet->wager;
                        $user = User::find(+$bet->user_id);
                        if ($bet->status === 'win') {
                            print_r("Won Money".PHP_EOL);
                            print_r("<br>");
                            $money_won = $wager * +$bet->odds;
                            Transaction::addMoneyWon($bet->user_id, $bet->id, $money_won, 'bet_won');
                            $user->addMoneyWon($money_won, $wager);
                        } else if ($bet->status === 'push') {
                            print_r("Pushed".PHP_EOL);
                            print_r("<br>");
                            Transaction::addMoneyWon($bet->user_id, $bet->id, $wager, 'bet_pushed');
                            $user->addMoneyWon($wager, $wager);
                        } else {
                            print_r("Lost Bet".PHP_EOL);
                            print_r("<br>");
                            $user->removeMoneyInPlay($wager);
                        }
                    }
                }
            } else {
                $dbEntry = Game::where('home_team', $game['home_team'])->where('away_team', $game['away_team'])->where('game_status', 'pending')->first();
                if ($dbEntry) {
                    print_r("Updating game with home team {$game['home_team']}".PHP_EOL);
                    print_r("<br>");
                    $dbEntry->update([
                        'game_status' => 'marked'
                    ]);
                }
            }   
        }
        print_r("SCORESSSS".PHP_EOL);
    }

    public function getUpcomingGames($league)
    {
        $games = $this->getGames($league, 'upcoming');
        return json_encode($games);
    }

    public function getCompletedGames($league)
    {
        $games = $this->getGames($league, 'completed');
        return json_encode($games);
    }

    public function getGames($league, $status)
    {
        if ($status === 'upcoming')
            $games = Game::where('league', $league)->where('game_status', 'pending')->get();
        else
            $games = Game::where('league', $league)->where('game_status', '!=', 'pending')->get();
        
        $results = [];
        // adds the teams relationship. look up how to do this automatically
        foreach ($games as $game) {
            $game->teams;
            $results[] = $game;
        }
        return $results;
    }
}
