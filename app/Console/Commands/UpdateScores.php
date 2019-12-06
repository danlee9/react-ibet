<?php

namespace App\Console\Commands;

use App\Http\Controllers\GameController;
use Illuminate\Console\Command;

class UpdateScores extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:scores {league}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Game Scores';

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
        $league = $this->argument('league');
        $gc = new GameController;
        $gc->updateScores($league);
    }
}
