<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('teams')->insert([
            ['league' => 'nfl', 'full_name' => 'Buffalo Bills', 'abbreviation' => 'BUF', 'image_source' => 'nfl/BUF.png'],
            ['league' => 'nfl', 'full_name' => 'Miami Dolphins', 'abbreviation' => 'MIA', 'image_source' => 'nfl/MIA.png'],
            ['league' => 'nfl', 'full_name' => 'New England Patriots', 'abbreviation' => 'NE', 'image_source' => 'nfl/NE.png'],
            ['league' => 'nfl', 'full_name' => 'New York Jets', 'abbreviation' => 'NYJ', 'image_source' => 'nfl/NYJ.png'],
            ['league' => 'nfl', 'full_name' => 'Baltimore Ravens', 'abbreviation' => 'BAL', 'image_source' => 'nfl/BAL.png'],
            ['league' => 'nfl', 'full_name' => 'Cincinnati Bengals', 'abbreviation' => 'CIN', 'image_source' => 'nfl/CIN.png'],
            ['league' => 'nfl', 'full_name' => 'Cleveland Browns', 'abbreviation' => 'CLE', 'image_source' => 'nfl/CLE.png'],
            ['league' => 'nfl', 'full_name' => 'Pittsburgh Steelers', 'abbreviation' => 'PIT', 'image_source' => 'nfl/PIT.png'],
            ['league' => 'nfl', 'full_name' => 'Houston Texans', 'abbreviation' => 'HOU', 'image_source' => 'nfl/HOU.png'],
            ['league' => 'nfl', 'full_name' => 'Indianapolis Colts', 'abbreviation' => 'IND', 'image_source' => 'nfl/IND.png'],
            ['league' => 'nfl', 'full_name' => 'Jacksonville Jaguars', 'abbreviation' => 'JAC', 'image_source' => 'nfl/JAC.png'],
            ['league' => 'nfl', 'full_name' => 'Tennessee Titans', 'abbreviation' => 'TEN', 'image_source' => 'nfl/TEN.png'],
            ['league' => 'nfl', 'full_name' => 'Denver Broncos', 'abbreviation' => 'DEN', 'image_source' => 'nfl/DEN.png'],
            ['league' => 'nfl', 'full_name' => 'Kansas City Chiefs', 'abbreviation' => 'KC', 'image_source' => 'nfl/KC.png'],
            ['league' => 'nfl', 'full_name' => 'Los Angeles Chargers', 'abbreviation' => 'LAC', 'image_source' => 'nfl/LAC.png'],
            ['league' => 'nfl', 'full_name' => 'Oakland Raiders', 'abbreviation' => 'OAK', 'image_source' => 'nfl/OAK.png'],
            ['league' => 'nfl', 'full_name' => 'Dallas Cowboys', 'abbreviation' => 'DAL', 'image_source' => 'nfl/DAL.png'],
            ['league' => 'nfl', 'full_name' => 'New York Giants', 'abbreviation' => 'NYG', 'image_source' => 'nfl/NYG.png'],
            ['league' => 'nfl', 'full_name' => 'Philadelphia Eagles', 'abbreviation' => 'PHI', 'image_source' => 'nfl/PHI.png'],
            ['league' => 'nfl', 'full_name' => 'Washington Redskins', 'abbreviation' => 'WAS', 'image_source' => 'nfl/WAS.png'],
            ['league' => 'nfl', 'full_name' => 'Chicago Bears', 'abbreviation' => 'CHI', 'image_source' => 'nfl/CHI.png'],
            ['league' => 'nfl', 'full_name' => 'Detroit Lions', 'abbreviation' => 'DET', 'image_source' => 'nfl/DET.png'],
            ['league' => 'nfl', 'full_name' => 'Green Bay Packers', 'abbreviation' => 'GB', 'image_source' => 'nfl/GB.png'],
            ['league' => 'nfl', 'full_name' => 'Minnesota Vikings', 'abbreviation' => 'MIN', 'image_source' => 'nfl/MIN.png'],
            ['league' => 'nfl', 'full_name' => 'Atlanta Falcons', 'abbreviation' => 'ATL', 'image_source' => 'nfl/ATL.png'],
            ['league' => 'nfl', 'full_name' => 'Carolina Panthers', 'abbreviation' => 'CAR', 'image_source' => 'nfl/CAR.png'],
            ['league' => 'nfl', 'full_name' => 'New Orleans Saints', 'abbreviation' => 'NO', 'image_source' => 'nfl/NO.png'],
            ['league' => 'nfl', 'full_name' => 'Tampa Bay Buccaneers', 'abbreviation' => 'TB', 'image_source' => 'nfl/TB.png'],
            ['league' => 'nfl', 'full_name' => 'Arizona Cardinals', 'abbreviation' => 'ARI', 'image_source' => 'nfl/ARI.png'],
            ['league' => 'nfl', 'full_name' => 'Los Angeles Rams', 'abbreviation' => 'LAR', 'image_source' => 'nfl/LAR.png'],
            ['league' => 'nfl', 'full_name' => 'San Francisco 49ers', 'abbreviation' => 'SF', 'image_source' => 'nfl/SF.png'],
            ['league' => 'nfl', 'full_name' => 'Seattle Seahawks', 'abbreviation' => 'SEA', 'image_source' => 'nfl/SEA.png'],
            ['league' => 'nba', 'full_name' => 'Boston Celtics', 'abbreviation' => 'BOS', 'image_source' => 'nba/BOS.png'],
            ['league' => 'nba', 'full_name' => 'Brooklyn Nets', 'abbreviation' => 'BKN', 'image_source' => 'nba/BKN.png'],
            ['league' => 'nba', 'full_name' => 'New York Knicks', 'abbreviation' => 'NYK', 'image_source' => 'nba/NYK.png'],
            ['league' => 'nba', 'full_name' => 'Philadelphia 76ers', 'abbreviation' => 'PHI', 'image_source' => 'nba/PHI.png'],
            ['league' => 'nba', 'full_name' => 'Toronto Raptors', 'abbreviation' => 'TOR', 'image_source' => 'nba/TOR.png'],
            ['league' => 'nba', 'full_name' => 'Chicago Bulls', 'abbreviation' => 'CHI', 'image_source' => 'nba/CHI.png'],
            ['league' => 'nba', 'full_name' => 'Cleveland Cavaliers', 'abbreviation' => 'CLE', 'image_source' => 'nba/CLE.png'],
            ['league' => 'nba', 'full_name' => 'Detroit Pistons', 'abbreviation' => 'DET', 'image_source' => 'nba/DET.png'],
            ['league' => 'nba', 'full_name' => 'Indiana Pacers', 'abbreviation' => 'IND', 'image_source' => 'nba/IND.png'],
            ['league' => 'nba', 'full_name' => 'Milwaukee Bucks', 'abbreviation' => 'MIL', 'image_source' => 'nba/MIL.png'],
            ['league' => 'nba', 'full_name' => 'Atlanta Hawks', 'abbreviation' => 'ATL', 'image_source' => 'nba/ATL.png'],
            ['league' => 'nba', 'full_name' => 'Charlotte Hornets', 'abbreviation' => 'CHA', 'image_source' => 'nba/CHA.png'],
            ['league' => 'nba', 'full_name' => 'Miami Heat', 'abbreviation' => 'MIA', 'image_source' => 'nba/MIA.png'],
            ['league' => 'nba', 'full_name' => 'Orlando Magic', 'abbreviation' => 'ORL', 'image_source' => 'nba/ORL.png'],
            ['league' => 'nba', 'full_name' => 'Washington Wizards', 'abbreviation' => 'WAS', 'image_source' => 'nba/WAS.png'],
            ['league' => 'nba', 'full_name' => 'Denver Nuggets', 'abbreviation' => 'DEN', 'image_source' => 'nba/DEN.png'],
            ['league' => 'nba', 'full_name' => 'Minnesota Timberwolves', 'abbreviation' => 'MIN', 'image_source' => 'nba/MIN.png'],
            ['league' => 'nba', 'full_name' => 'Oklahoma City Thunder', 'abbreviation' => 'OKC', 'image_source' => 'nba/OKC.png'],
            ['league' => 'nba', 'full_name' => 'Portland Trail Blazers', 'abbreviation' => 'POR', 'image_source' => 'nba/POR.png'],
            ['league' => 'nba', 'full_name' => 'Utah Jazz', 'abbreviation' => 'UTA', 'image_source' => 'nba/UTA.png'],
            ['league' => 'nba', 'full_name' => 'Golden State Warriors', 'abbreviation' => 'GS', 'image_source' => 'nba/GS.png'],
            ['league' => 'nba', 'full_name' => 'Los Angeles Clippers', 'abbreviation' => 'LAC', 'image_source' => 'nba/LAC.png'],
            ['league' => 'nba', 'full_name' => 'Los Angeles Lakers', 'abbreviation' => 'LAL', 'image_source' => 'nba/LAL.png'],
            ['league' => 'nba', 'full_name' => 'Phoenix Suns', 'abbreviation' => 'PHO', 'image_source' => 'nba/PHO.png'],
            ['league' => 'nba', 'full_name' => 'Sacramento Kings', 'abbreviation' => 'SAC', 'image_source' => 'nba/SAC.png'],
            ['league' => 'nba', 'full_name' => 'Dallas Mavericks', 'abbreviation' => 'DAL', 'image_source' => 'nba/DAL.png'],
            ['league' => 'nba', 'full_name' => 'Houston Rockets', 'abbreviation' => 'HOU', 'image_source' => 'nba/HOU.png'],
            ['league' => 'nba', 'full_name' => 'Memphis Grizzlies', 'abbreviation' => 'MEM', 'image_source' => 'nba/MEM.png'],
            ['league' => 'nba', 'full_name' => 'New Orleans Pelicans', 'abbreviation' => 'NO', 'image_source' => 'nba/NO.png'],
            ['league' => 'nba', 'full_name' => 'San Antonio Spurs', 'abbreviation' => 'SAS', 'image_source' => 'nba/SAS.png']
        ]);
    }
}
