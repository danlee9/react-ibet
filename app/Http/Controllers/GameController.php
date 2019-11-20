<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;
use App\Http\Controllers\ThirdPartyServicesController as ThirdParty;


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
    }

    public function updateNFLMoneylines()
    {
        $thirdParty = new ThirdParty;
        $games = $thirdParty->getNFLMoneyLines();
        foreach ($games as $game) {
            Game::updateOrCreate(
                ['home_team' => $game['home_team'], 'away_team' => $game['away_team'], 'game_status' => 'pending'],
                ['league' => 'NFL', 'unix_start_time' => $game['unix_start_time'], 'home_moneyline' => $game['home_moneyline'], 'away_moneyline' => $game['away_moneyline']]
            );
        }
        print_r("MONEYLINE");
    }

    public function updateNFLPointSpreads()
    {   
        $thirdParty = new ThirdParty;
        $games = $thirdParty->getNFLPointSpreads();
        foreach ($games as $game) {
            Game::updateOrCreate(
                ['home_team' => $game['home_team'], 'away_team' => $game['away_team'], 'game_status' => 'pending'],
                ['league' => 'NFL', 'unix_start_time' => $game['unix_start_time'], 'home_point_spread' => $game['home_point_spread'], 'away_point_spread' => $game['away_point_spread'], 'home_point_odds' => $game['home_point_odds'], 'away_point_odds' => $game['away_point_odds']]
            );
        }
        print_r("SPREADSSSSSSSS");
    }

    public function updateNFLOverUnders()
    {

        $thirdParty = new ThirdParty;
        $games = $thirdParty->getNFLOverUnders();
        foreach ($games as $game) {
            Game::updateOrCreate(
                ['home_team' => $game['home_team'], 'away_team' => $game['away_team'], 'game_status' => 'pending'],
                ['league' => 'NFL', 'unix_start_time' => $game['unix_start_time'], 'over_under' => $game['over_under'], 'over_odds' => $game['over_odds'], 'under_odds' => $game['under_odds']]
            );
        }
        print_r("TOTALLSSSSS");
    }

    public function updateNFLScores()
    {
        $thirdParty = new ThirdParty;
        $games = $thirdParty->getNFLCompletedGames();
        foreach ($games as $game) {
            if ($game['home_score'] && $game['away_score']) {
                $dbEntry = Game::where('home_team', $game['home_team'])->where('away_team', $game['away_team'])->where('game_status', 'pending')->first();
                if (!$dbEntry) {
                    $dbEntry = Game::where('home_team', $game['home_team'])->where('away_team', $game['away_team'])->where('game_status', 'marked')->first();
                    // print_r($game);
                    // print_r("<br>");
                }
                if ($dbEntry) {
                    // print_r("Updating scores with home team {$game['home_team']}");
                    // print_r("<br>");
                    $dbEntry->update([
                        'home_score' => $game['home_score'],
                        'away_score' => $game['away_score'],
                        'game_status' => 'completed'
                    ]);
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

    public function getUpcomingNFLGames()
    {
        // $games = Game::where('league', 'NFL')->where('game_status', 'pending')->get();
        // $response = [];
        // foreach ($games as $game) {
        //     $response[] = [
        //         'id' => $game->id,
        //         'home_team' => $game->home_team,
        //         'away_team' => $game->away_team,
        //         'unix_star_time' => $game->unix_star_time,
        //         'home_moneyline' => $game->home_moneyline,
        //         'away_moneyline' => $game->away_moneyline,
        //         'home_point_spread' => $game->home_point_spread,
        //         'away_point_spread' => $game->away_point_spread,
        //         'home_point_odds' => $game->home_point_odds,
        //         'away_point_odds' => $game->away_point_odds,
        //         'over_under' => $game->over_under,
        //         'over_odds' => $game->over_odds,
        //         'under_odds' => $game->under_odds,
        //         'home_score' => $game->home_score,
        //         'away_score' => $game->away_score,
        //         'game_status' => $game->game_status,
        //         'non_home_stadium' => $game->non_home_stadium
        //     ];
        // }
        // return json_encode($response);
        $games = $this->getNFLGames('upcoming');
        return json_encode($games);
    }

    public function getCompletedNFLGames()
    {
        $games = $this->getNFLGames('compleed');
        return json_encode($games);
    }

    public function getNFLGames($status)
    {
        if ($status === 'upcoming')
            $games = Game::where('league', 'NFL')->where('game_status', 'pending')->get();
        else
            $games = Game::where('league', 'NFL')->where('game_status', '!=', 'pending')->get();
        foreach ($games as $game) {
            $response[] = [
                'id' => $game->id,
                'home_team' => $game->home_team,
                'away_team' => $game->away_team,
                'unix_star_time' => $game->unix_star_time,
                'home_moneyline' => $game->home_moneyline,
                'away_moneyline' => $game->away_moneyline,
                'home_point_spread' => $game->home_point_spread,
                'away_point_spread' => $game->away_point_spread,
                'home_point_odds' => $game->home_point_odds,
                'away_point_odds' => $game->away_point_odds,
                'over_under' => $game->over_under,
                'over_odds' => $game->over_odds,
                'under_odds' => $game->under_odds,
                'home_score' => $game->home_score,
                'away_score' => $game->away_score,
                'game_status' => $game->game_status,
                'non_home_stadium' => $game->non_home_stadium
            ];
        }
        return $games;
    }
}
