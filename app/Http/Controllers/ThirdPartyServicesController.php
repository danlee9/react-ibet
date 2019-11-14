<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ThirdPartyServicesController extends Controller
{
    public function __construct()
    {
        $this->key = config('services.odds-api.key');
    }

    public function getNFLMoneyLines()
    {
        $endpoint = "https://api.the-odds-api.com/v3/odds?api_key={$this->key}&sport=americanfootball_nfl&region=us&mkt=h2h";
        $data = $this->get($endpoint);
        $games = [];
        foreach ($data->data as $game) {
            $lowVigData = $this->findLowVigSiteData($game->sites);

            $teams = [];
            for ($i = 0; $i < 2; $i++) {
                $teams[$game->teams[$i]] = $lowVigData ? $lowVigData->odds->h2h[$i] : null;
            }

            $home_team = $game->home_team;
            $away_team = $this->findAwayTeam($home_team, $game->teams);

            $games[] = [
                'home_team' => $home_team,
                'away_team' => $away_team,
                'unix_start_time' => $game->commence_time,
                'home_moneyline' => $teams[$home_team],
                'away_moneyline' => $teams[$away_team]
            ];
        }
        return $games;
    }

    public function getNFLPointSpreads()
    {
        $endpoint = "https://api.the-odds-api.com/v3/odds?api_key={$this->key}&sport=americanfootball_nfl&region=us&mkt=spreads";
        $data = $this->get($endpoint);
        $games = [];
        foreach ($data->data as $game) {
            $lowVigData = $this->findLowVigSiteData($game->sites);

            $teams = [];
            for ($i = 0; $i < 2; $i++) {
                $teams[$game->teams[$i]] = [
                    'odds' => $lowVigData ? $lowVigData->odds->spreads->odds[$i] : null,
                    'points' => $lowVigData ? $lowVigData->odds->spreads->points[$i] : null
                ];
            }

            $home_team = $game->home_team;
            $away_team = $this->findAwayTeam($home_team, $game->teams);

            $games[] = [
                'home_team' => $home_team,
                'away_team' => $away_team,
                'unix_start_time' => $game->commence_time,
                'home_point_spread' => $teams[$home_team]['points'],
                'away_point_spread' => $teams[$away_team]['points'],
                'home_point_odds' => $teams[$home_team]['odds'],
                'away_point_odds' => $teams[$away_team]['odds']
            ];
        }
        return $games;
    }

    public function getNFLOverUnders()
    {
        $endpoint = "https://api.the-odds-api.com/v3/odds?api_key={$this->key}&sport=americanfootball_nfl&region=us&mkt=totals";
        $data = $this->get($endpoint);
        $games = [];
        foreach ($data->data as $game) {
            $lowVigData = $this->findLowVigSiteData($game->sites);

            $total = $lowVigData ? $lowVigData->odds->totals->points[0] : null;
            $totals = [];

            if ($lowVigData) {
                for ($i = 0; $i < 2; $i++) {
                    $totals[$lowVigData->odds->totals->position[$i]] = $lowVigData->odds->totals->odds[$i];
                }
            } else {
                $totals['over'] = null;
                $totals['under'] = null;
            }

            $home_team = $game->home_team;
            $away_team = $this->findAwayTeam($home_team, $game->teams);

            $games[] = [
                'home_team' => $home_team,
                'away_team' => $away_team,
                'unix_start_time' => $game->commence_time,
                'over_under' => $total,
                'over_odds' => $totals['over'],
                'under_odds' => $totals['under']
            ];
        }
        return $games;
    }

    public static function get($endpoint)
    {
        $client = new \GuzzleHttp\Client();
        $request = $client->get($endpoint);
        $response = $request->getBody();
        $data = json_decode($response->getContents());
        return $data;
    }

    public function findLowVigSiteData($sites)
    {
        foreach ($sites as $site) {
            if ($site->site_key === 'lowvig') {
                return $site;
            }
        }
        return false;
    }

    public function findAwayTeam($home_team, $teams)
    {
        foreach ($teams as $team) {
            if ($team !== $home_team) {
                return $team;
            }
        }
    }
}
