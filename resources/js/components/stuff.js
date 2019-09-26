let example = [ { key: 'americanfootball_ncaaf',
    active: true,
    group: 'American Football',
    details: 'US College Football',
    title: 'NCAAF' },
  { key: 'americanfootball_nfl',
    active: true,
    group: 'American Football',
    details: 'US Football',
    title: 'NFL' },
  { key: 'aussierules_afl',
    active: true,
    group: 'Aussie Rules',
    details: 'Aussie Football',
    title: 'AFL' },
  { key: 'baseball_mlb',
    active: true,
    details: 'Major League Baseball 🇺🇸',
    group: 'Baseball',
    title: 'MLB' },
  { key: 'basketball_euroleague',
    active: true,
    group: 'Basketball',
    details: 'Basketball Euroleague',
    title: 'Basketball Euroleague' },
  { key: 'basketball_nba',
    active: true,
    group: 'Basketball',
    details: 'US Basketball',
    title: 'NBA' },
  { key: 'cricket_odi',
    active: true,
    details: 'One Day Internationals',
    group: 'Cricket',
    title: 'One Day Internationals' },
  { key: 'cricket_test_match',
    active: true,
    details: 'International Test Matches',
    group: 'Cricket',
    title: 'Test Matches' },
  { key: 'mma_mixed_martial_arts',
    active: true,
    group: 'Mixed Martial Arts',
    details: 'Mixed Martial Arts',
    title: 'MMA' },
  { key: 'rugbyleague_nrl',
    active: true,
    group: 'Rugby League',
    details: 'Aussie Rugby League',
    title: 'NRL' },
  { key: 'soccer_australia_aleague',
    active: true,
    group: 'Soccer - Other',
    details: 'Aussie Soccer 🇦🇺',
    title: 'A-League' },
  { key: 'soccer_belgium_first_div',
    active: true,
    group: 'Soccer - Europe',
    details: 'Belgium Soccer 🇧🇪',
    title: 'Belgium First Div' },
  { key: 'soccer_brazil_campeonato',
    active: true,
    group: 'Soccer - Other',
    details: 'Campeonato Brasileiro 🇧🇷',
    title: 'Brazil Série A' },
  { key: 'soccer_china_superleague',
    active: true,
    details: 'Chinese Soccer 🇨🇳',
    group: 'Soccer - Other',
    title: 'Super League - China' },
  { key: 'soccer_denmark_superliga',
    active: true,
    group: 'Soccer - Europe',
    details: 'Danish Soccer 🇩🇰',
    title: 'Denmark Superliga' },
  { key: 'soccer_efl_champ',
    active: true,
    group: 'Soccer - UK',
    details: 'EFL Championship 🇬🇧',
    title: 'Championship' },
  { key: 'soccer_england_league1',
    active: true,
    group: 'Soccer - UK',
    details: 'EFL League 1 🇬🇧',
    title: 'League 1' },
  { key: 'soccer_england_league2',
    active: true,
    group: 'Soccer - UK',
    details: 'EFL League 2  🇬🇧',
    title: 'League 2' },
  { key: 'soccer_epl',
    active: true,
    group: 'Soccer - UK',
    details: 'English Premier League 🇬🇧',
    title: 'EPL' },
  { key: 'soccer_finland_veikkausliiga',
    active: true,
    group: 'Soccer - Europe',
    details: 'Finnish  Soccer 🇫🇮',
    title: 'Veikkausliiga - Finland' },
  { key: 'soccer_france_ligue_one',
    active: true,
    group: 'Soccer - Europe',
    details: 'French Soccer 🇫🇷',
    title: 'Ligue 1 - France' },
  { key: 'soccer_germany_bundesliga',
    active: true,
    group: 'Soccer - Europe',
    details: 'German Soccer 🇩🇪',
    title: 'Bundesliga - Germany' },
  { key: 'soccer_germany_bundesliga2',
    active: true,
    details: 'German Soccer 🇩🇪',
    group: 'Soccer - Europe',
    title: 'Bundesliga 2 - Germany' },
  { key: 'soccer_italy_serie_a',
    active: true,
    group: 'Soccer - Europe',
    details: 'Italian Soccer 🇮🇹',
    title: 'Serie A - Italy' },
  { key: 'soccer_italy_serie_b',
    active: true,
    details: 'Italian Soccer 🇮🇹',
    group: 'Soccer - Europe',
    title: 'Serie B - Italy' },
  { key: 'soccer_korea_kleague1',
    active: true,
    details: 'Korean Soccer 🇰🇷',
    group: 'Soccer - Other',
    title: 'K League 1' },
  { key: 'soccer_mexico_ligamx',
    active: true,
    details: 'Mexican Soccer 🇲🇽',
    group: 'Soccer - Other',
    title: 'Liga MX' },
  { key: 'soccer_netherlands_eredivisie',
    active: true,
    group: 'Soccer - Europe',
    details: 'Dutch Soccer 🇳🇱',
    title: 'Dutch Eredivisie' },
  { key: 'soccer_norway_eliteserien',
    active: true,
    group: 'Soccer - Europe',
    details: 'Norwegian Soccer 🇳🇴',
    title: 'Eliteserien - Norway' },
  { key: 'soccer_portugal_primeira_liga',
    active: true,
    group: 'Soccer - Europe',
    details: 'Portugese Soccer 🇵🇹',
    title: 'Primeira Liga - Portugal' },
  { key: 'soccer_russia_premier_league',
    active: true,
    group: 'Soccer - Europe',
    details: 'Russian Soccer 🇷🇺',
    title: 'Premier League - Russia' },
  { key: 'soccer_spain_la_liga',
    active: true,
    group: 'Soccer - Europe',
    details: 'Spanish Soccer 🇪🇸',
    title: 'La Liga - Spain' },
  { key: 'soccer_spl',
    active: true,
    group: 'Soccer - UK',
    details: 'Scottish Premier League 🇬🇧',
    title: 'SPL' },
  { key: 'soccer_sweden_allsvenskan',
    active: true,
    group: 'Soccer - Europe',
    details: 'Swedish Soccer 🇸🇪',
    title: 'Allsvenskan - Sweden' },
  { key: 'soccer_sweden_superettan',
    active: true,
    details: 'Swedish Soccer 🇸🇪',
    group: 'Soccer - Europe',
    title: 'Superettan - Sweden' },
  { key: 'soccer_switzerland_superleague',
    active: true,
    group: 'Soccer - Europe',
    details: 'Swiss Soccer 🇨🇭',
    title: 'Swiss Superleague' },
  { key: 'soccer_turkey_super_league',
    active: true,
    group: 'Soccer - Europe',
    details: 'Turkish Soccer 🇹🇷',
    title: 'Turkey Super League' },
  { key: 'soccer_uefa_champs_league',
    active: true,
    group: 'Soccer - Europe',
    details: 'European Champions League 🇪🇺',
    title: 'UEFA Champions' },
  { key: 'soccer_uefa_europa_league',
    active: true,
    group: 'Soccer - Europe',
    details: 'European Europa League 🇪🇺',
    title: 'UEFA Europa' },
  { key: 'soccer_usa_mls',
    active: true,
    group: 'Soccer - Other',
    details: 'Major League Soccer 🇺🇸',
    title: 'MLS' } ];



let events = {
    "sport_key":"americanfootball_nfl",
    "sport_nice":"NFL",
    "teams":[
        "Green Bay Packers",
        "Philadelphia Eagles"
    ],
    "commence_time":1569543600,
    "home_team":"Green Bay Packers",
    "sites":[
        {
            "site_key":"mybookieag",
            "site_nice":"MyBookie.ag",
            "last_update":1569311494,
            "odds":{
                "h2h":[
                1.5,
                2.7
                ]
            }
        },
        {
            "site_key":"betonlineag",
            "site_nice":"BetOnline.ag",
            "last_update":1569311812,
            "odds":{
                "h2h":[
                1.48,
                2.8
                ]
            }
        },
        {
            "site_key":"lowvig",
            "site_nice":"LowVig.ag",
            "last_update":1569311456,
            "odds":{
                "h2h":[
                1.48,
                2.8
                ]
            }
        },
        {
            "site_key":"bovada",
            "site_nice":"Bovada",
            "last_update":1569311810,
            "odds":{
                "h2h":[
                1.45,
                2.8
                ]
            }
        },
        {
            "site_key":"bookmaker",
            "site_nice":"Bookmaker",
            "last_update":1569311532,
            "odds":{
                "h2h":[
                1.5,
                2.7
                ]
            }
        },
        {
            "site_key":"betfair",
            "site_nice":"Betfair",
            "last_update":1569311807,
            "odds":{
                "h2h":[
                1.5,
                2.86
                ],
                "h2h_lay":[
                1.53,
                3.05
                ]
            }
        },
        {
            "site_key":"intertops",
            "site_nice":"Intertops",
            "last_update":1569311497,
            "odds":{
                "h2h":[
                1.49,
                2.75
                ]
            }
        },
        {
            "site_key":"gtbets",
            "site_nice":"GTbets",
            "last_update":1569311529,
            "odds":{
                "h2h":[
                1.48,
                2.8
                ]
            }
        }
    ],
    "sites_count":8
}

let spreads = {"sport_key":"americanfootball_nfl","sport_nice":"NFL","teams":["Green Bay Packers","Philadelphia Eagles"],"commence_time":1569543600,"home_team":"Green Bay Packers","sites":[{"site_key":"mybookieag","site_nice":"MyBookie.ag","last_update":1569312301,"odds":{"spreads":{"odds":[1.87,1.952],"points":["-4.5","4.5"]}}},{"site_key":"betonlineag","site_nice":"BetOnline.ag","last_update":1569312213,"odds":{"spreads":{"odds":[1.909,1.909],"points":["-4.5","4.5"]}}},{"site_key":"lowvig","site_nice":"LowVig.ag","last_update":1569312263,"odds":{"spreads":{"odds":[1.952,1.952],"points":["-4.5","4.5"]}}},{"site_key":"bovada","site_nice":"Bovada","last_update":1569312212,"odds":{"spreads":{"odds":[1.952381,1.87],"points":["-5.0","5.0"]}}},{"site_key":"intertops","site_nice":"Intertops","last_update":1569312304,"odds":{"spreads":{"odds":[1.9091,1.9091],"points":["-4.50","4.50"]}}},{"site_key":"gtbets","site_nice":"GTbets","last_update":1569312339,"odds":{"spreads":{"odds":[1.917,1.917],"points":["-4.5","4.5"]}}}],"sites_count":6};

let totals = {"sport_key":"americanfootball_nfl","sport_nice":"NFL","teams":["Green Bay Packers","Philadelphia Eagles"],"commence_time":1569543600,"home_team":"Green Bay Packers","sites":[{"site_key":"mybookieag","site_nice":"MyBookie.ag","last_update":1569314321,"odds":{"totals":{"position":["over","under"],"odds":[1.909,1.909],"points":[45,45]}}},{"site_key":"betonlineag","site_nice":"BetOnline.ag","last_update":1569314219,"odds":{"totals":{"position":["over","under"],"odds":[1.87,1.952],"points":[45,45]}}},{"site_key":"lowvig","site_nice":"LowVig.ag","last_update":1569314278,"odds":{"totals":{"position":["over","under"],"odds":[1.909,2],"points":[45,45]}}},{"site_key":"bovada","site_nice":"Bovada","last_update":1569313821,"odds":{"totals":{"position":["over","under"],"odds":[1.909091,1.909091],"points":[45,45]}}},{"site_key":"bookmaker","site_nice":"Bookmaker","last_update":1569313963,"odds":{"totals":{"position":["over","under"],"odds":[1.855,1.952],"points":[44.5,44.5]}}},{"site_key":"intertops","site_nice":"Intertops","last_update":1569314323,"odds":{"totals":{"position":["over","under"],"odds":[1.9091,1.9091],"points":[45,45]}}}],"sites_count":6}

function convert(euroOdds) {
    if (euroOdds < 2) {
      let num = euroOdds - 1;
      return '-' + Math.round((1/num) * 100);
    } else {
      return '+' + Math.round((euroOdds - 1) * 100);
    }
  }
  
  console.log(convert(2.5));