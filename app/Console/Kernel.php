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
        Commands\UpdateScores::class,
        Commands\UpdateOdds::class
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
        // Hourly nfl scores update
        $schedule->command('update:scores nfl')->hourlyAt(5)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber < 3 || $dateNumber > 8;
        });

        // Morning nfl odds update
        $schedule->command('update:odds nfl')->twiceDaily(6, 9)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber < 3 || $dateNumber > 8;
        });

        // Nighttime nfl odds update
        $schedule->command('update:odds nfl')->twiceDaily(3, 22)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber < 3 || $dateNumber > 8;
        });

        // Hourly nba scores update
        $schedule->command('update:scores nba')->hourlyAt(15)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber < 7 || $dateNumber > 9;
        });

        // Morning nba odds update
        $schedule->command('update:odds nba')->twiceDaily(7, 10)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber < 7 || $dateNumber > 9;
        });

        // Nighttime nba odds update
        $schedule->command('update:odds nba')->twiceDaily(4, 23)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber < 7 || $dateNumber > 9;
        });

        // Hourly mlb scores update
        $schedule->command('update:scores mlb')->hourlyAt(25)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber > 2 && $dateNumber < 11;
        });

        // Morning mlb odds update
        $schedule->command('update:odds mlb')->twiceDaily(7, 10)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber > 2 && $dateNumber < 11;
        });

        // Nighttime mlb odds update
        $schedule->command('update:odds mlb')->twiceDaily(4, 23)->when(function() {
            $dateNumber = +date('n');
            return $dateNumber > 2 && $dateNumber < 11;
        });

        // // Hourly nhl scores update
        // $schedule->command('update:scores nhl')->hourlyAt(35)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber < 7 || $dateNumber > 9;
        // });

        // // Morning nhl odds update
        // $schedule->command('update:odds nhl')->twiceDaily(7, 10)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber < 7 || $dateNumber > 9;
        // });

        // // Nighttime nhl odds update
        // $schedule->command('update:odds nhl')->twiceDaily(4, 23)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber < 7 || $dateNumber > 9;
        // });

        // // Hourly cfb scores update
        // $schedule->command('update:scores cfb')->hourlyAt(45)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber < 2 || $dateNumber > 7;
        // });

        // // Morning cfb odds update
        // $schedule->command('update:odds cfb')->twiceDaily(6, 9)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber < 2 || $dateNumber > 7;
        // });

        // // Nighttime cfb odds update
        // $schedule->command('update:odds cfb')->twiceDaily(3, 23)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber < 2 || $dateNumber > 7;
        // });

        // // Hourly cbb scores update
        // $schedule->command('update:scores cbb')->hourlyAt(55)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber < 5 || $dateNumber > 10;
        // });

        // // Morning cbb odds update
        // $schedule->command('update:odds cbb')->twiceDaily(6, 9)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber < 5 || $dateNumber > 10;
        // });

        // // Nighttime cbb odds update
        // $schedule->command('update:odds cbb')->twiceDaily(3, 23)->when(function() {
        //     $dateNumber = +date('n');
        //     return $dateNumber < 5 || $dateNumber > 10;
        // });

        // $schedule->command('minute:update')->everyMinute();
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
