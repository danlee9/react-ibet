<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Get the timezone that should be used by default for scheduled events.
     *
     * @return \DateTimeZone|string|null
     */
    protected function scheduleTimezone()
    {
        return 'America/Los_Angeles';
    }

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();
        $schedule->command('update:scores nfl')->twiceDaily(2, 22)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber > 2 && $dateNumber < 9;
        });

        $schedule->command('update:odds nfl')->twiceDaily(2, 22)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber > 2 && $dateNumber < 9;
        });

        $schedule->command('update:scores nba')->twiceDaily(4, 23)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber > 6 && $dateNumber < 10;
        });

        $schedule->command('update:odds nba')->twiceDaily(4, 23)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber > 6 && $dateNumber < 10;
        });

        $schedule->command('update:scores mlb')->twiceDaily(4, 23)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber < 3 || $dateNumber > 10;
        });

        $schedule->command('update:odds mlb')->twiceDaily(4, 23)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber < 3 || $dateNumber > 10;
        });

        // $schedule->command('update:scores nhl')->twiceDaily(4, 23)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber > 6 && $dateNumber < 10;
        // });

        // $schedule->command('update:odds nhl')->twiceDaily(4, 23)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber > 6 && $dateNumber < 10;
        // });

        // $schedule->command('update:scores cfb')->twiceDaily(2, 23)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber > 1 && $dateNumber < 8;
        // });

        // $schedule->command('update:odds cfb')->twiceDaily(2, 23)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber > 1 && $dateNumber < 8;
        // });

        // $schedule->command('update:scores cbb')->twiceDaily(4, 23)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber > 4 && $dateNumber < 11;
        // });

        // $schedule->command('update:odds cbb')->twiceDaily(4, 23)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber > 4 && $dateNumber < 11;
        // });
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
