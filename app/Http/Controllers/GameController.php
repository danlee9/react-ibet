<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;
use App\Team;
use App\Http\Controllers\ThirdPartyServicesController as ThirdParty;
use App\Transaction;
use App\User;


class GameController extends Controller
{
    public static function blah()
    {
        $client = new \GuzzleHttp\Client();
        $request = $client->get('https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=Arsenal');
        $response = $request->getBody();
        $data = $response->getContents();
        $decoded = json_decode($data);
        print_r($decoded->teams[0]->idTeam);
        //americanfootball_nfl
        //basketball_nba
    }

    public function updateMoneylines($league)
    {
        $thirdParty = new ThirdParty;
        $games = $thirdParty->getMoneyLines($league);
        foreach ($games as $game) {
            Game::updateOrCreate(
                ['home_team' => $game['home_team'], 'away_team' => $game['away_team'], 'game_status' => 'pending'],
                ['league' => $league, 'unix_start_time' => $game['unix_start_time'], 'home_moneyline' => $game['home_moneyline'], 'away_moneyline' => $game['away_moneyline']]
            );
        }
        print_r("MONEYLINE");
    }

    public function updatePointSpreads($league)
    {   
        $thirdParty = new ThirdParty;
        $games = $thirdParty->getPointSpreads($league);
        foreach ($games as $game) {
            Game::updateOrCreate(
                ['home_team' => $game['home_team'], 'away_team' => $game['away_team'], 'game_status' => 'pending'],
                ['league' => $league, 'unix_start_time' => $game['unix_start_time'], 'home_point_spread' => $game['home_point_spread'], 'away_point_spread' => $game['away_point_spread'], 'home_point_odds' => $game['home_point_odds'], 'away_point_odds' => $game['away_point_odds']]
            );
        }
        print_r("SPREADSSSSSSSS");
    }

    public function updateOverUnders($league)
    {

        $thirdParty = new ThirdParty;
        $games = $thirdParty->getOverUnders($league);
        foreach ($games as $game) {
            Game::updateOrCreate(
                ['home_team' => $game['home_team'], 'away_team' => $game['away_team'], 'game_status' => 'pending'],
                ['league' => $league, 'unix_start_time' => $game['unix_start_time'], 'over_under' => $game['over_under'], 'over_odds' => $game['over_odds'], 'under_odds' => $game['under_odds']]
            );
        }
        print_r("TOTALLSSSSS");
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
                    print_r("Updating scores with home team {$game['home_team']}");
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
                            print_r("Won Money");
                            print_r("<br>");
                            $money_won = $wager * +$bet->odds;
                            Transaction::addMoneyWon($bet->user_id, $bet->id, $money_won, 'bet_won');
                            $user->addMoneyWon($money_won, $wager);
                        } else if ($bet->status === 'push') {
                            print_r("Pushed");
                            print_r("<br>");
                            Transaction::addMoneyWon($bet->user_id, $bet->id, $wager, 'bet_pushed');
                            $user->addMoneyWon($wager, $wager);
                        } else {
                            print_r("Lost Bet");
                            print_r("<br>");
                            $user->removeMoneyInPlay($wager);
                        }
                    }
                }
            } else {
                $dbEntry = Game::where('home_team', $game['home_team'])->where('away_team', $game['away_team'])->where('game_status', 'pending')->first();
                if ($dbEntry) {
                    print_r("Updating game with home team {$game['home_team']}");
                    print_r("<br>");
                    $dbEntry->update([
                        'game_status' => 'marked'
                    ]);
                }
            }   
        }
        print_r("SCORESSSS");
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
        
        // $results = [];
        // foreach ($games as $game) {
        //     $home_team = Team::where('full_name', $game->home_team)->first();
        //     $away_team = Team::where('full_name', $game->away_team)->first();
        //     $game->home_img = $home_team->image_source;
        //     $game->away_img = $away_team->image_source;
        // }
        return $games;
    }
}
