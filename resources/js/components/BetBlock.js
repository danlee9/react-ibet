import React from 'react';

const convertEuroOdds = odds => {
    if (odds < 2) {
        let num = odds - 1;
        return '-' + Math.round((1/num) * 100);
    } else {
        return '+' + Math.round((odds - 1) * 100);
    }
}

const renderDate = time => {
    let dateObj = new Date(time * 1000);
    let weekdayStr = dateObj
        .toLocaleDateString(undefined, { weekday: "short" })
        .toUpperCase();
    let dateStr = dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
    let timeStr = dateObj.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: true});
    return (
        <span>
            {`${weekdayStr} ${dateStr}`} <strong>{timeStr}</strong>
        </span>
    );
}

const BetBlock = props => {
    let { bet } = props;
    let side, rubric;
    let odds = convertEuroOdds(bet.odds);
    let { bet_type } = bet;
    if (bet_type == 'moneyline' || bet_type =='point_spread') {
        side = bet.team;
        if (bet_type == 'moneyline')
            rubric = 'ML';
        else
            rubric = bet.point_spread;
    } else {
        side = bet.position;
        side = side[0].toUpperCase() + side.slice(1); // capitalizes over and under
        rubric = bet.over_under;
    }
    let status = bet.status[0].toUpperCase() + bet.status.slice(1);
    let color = '';
    switch (status) {
        case 'Pending':
            color = 'black';
            break;
        case 'Loss':
            color = 'red';
            break;
        case 'Win':
            color = 'blue';
            break;
    }
    let date = renderDate(bet.game.unix_start_time)
    return (
        <div className="ui segments" style={{marginBottom: '20px'}}>
            <div className={`ui secondary segment ${color}`}>
                <div className="ui middle aligned grid">
                    <div className="row">
                        <div className="eight wide column"><strong>${bet.wager}</strong> {side} {rubric} ({odds})</div>
                        <div className="eight wide right aligned column">
                            <strong>Bet placed: {bet.created_at}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ui segment">
                <div className="ui middle aligned grid">
                    <div className="row">
                        <div className="eight wide column"><strong>{status}</strong></div>
                        <div className="eight wide right aligned column">
                            <strong>{date}</strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">{bet.game.away_team}</div>
                        <div className="eight wide right aligned column">
                            <strong>{bet.game.away_score}</strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">{bet.game.home_team}</div>
                        <div className="eight wide right aligned column">
                            <strong>{bet.game.home_score}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BetBlock;