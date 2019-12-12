<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bet extends Model
{
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function game()
    {
        return $this->belongsTo('App\Game');
    }

    public function transactions()
    {
        return $this->hasMany('App\Transaction');
    }

    public function gradeBet()
    {
        $game = $this->game;
        $home_score = $game->home_score;
        $away_score = $game->away_score;
        if ($this->team === $game->home_team) {
            $chosen_score = $home_score;
            $opposing_score = $away_score;
        } else {
            $chosen_score = $away_score;
            $opposing_score = $home_score;
        }
        if ($this->bet_type === 'moneyline') {
            if ($chosen_score > $opposing_score) {
                $status = 'win';
            } else if ($chosen_score === $opposing_score) {
                $status = 'push';
            } else {
                $status = 'loss';
            }
        } else if ($this->bet_type === 'point_spread') {
            // ==========DATA_TYPE_CHANGE========
            // if ($chosen_score + +$this->point_spread > $opposing_score) {
            //     $status = 'win';
            // } else if ($chosen_score + +$this->point_spread === $opposing_score) {
            //     $status = 'push';
            // } else {
            //     $status = 'loss';
            // }
            if ($chosen_score + $this->point_spread > $opposing_score) {
                $status = 'win';
            } else if ($chosen_score + $this->point_spread == $opposing_score) { // HAVE TO USE WEAK EQUALITY CUZ DIFF NUMBER TYPES
                $status = 'push';
            } else {
                $status = 'loss';
            }
        } else {
            // ==========DATA_TYPE_CHANGE========
            // if ($home_score + $away_score > +$this->over_under) {
            //     $status = 'win';
            // } else if ($home_score + $away_score === +$this->over_under) {
            //     $status = 'push';
            // } else {
            //     $status = 'loss';
            // }
            if ($home_score + $away_score > $this->over_under) {
                $status = 'win';
            } else if ($home_score + $away_score == $this->over_under) { // HAVE TO USE WEAK EQUALITY CUZ DIFF NUMBER TYPES
                $status = 'push';
            } else {
                $status = 'loss';
            }
        }
        $this->status = $status;
        $this->save();
    }
}
