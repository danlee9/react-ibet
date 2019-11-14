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
        print_r("THIRD PARTY");
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
}
