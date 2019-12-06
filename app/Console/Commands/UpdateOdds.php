<?php

namespace App\Console\Commands;

use App\Http\Controllers\GameController;
use Illuminate\Console\Command;

class UpdateOdds extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:odds {league} {type?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Game Odds';

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
        if ($this->argument('type'))
            $type = $this->argument('type');
        else
            $type = 'all';
        $league = $this->argument('league');
        $gc = new GameController;
        switch ($type) {
            case 'moneyline':
                $gc->updateMoneylines($league);
                break;
            case 'points':
                $gc->updatePointSpreads($league);
                break;
            case 'totals':
                $gc->updateOverUnders($league);
                break;
            default:
                $gc->updateMoneylines($league);
                $gc->updatePointSpreads($league);
                $gc->updateOverUnders($league);
        }
    }
}
