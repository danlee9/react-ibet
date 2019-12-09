import React from 'react';
import { convertEuroOdds, formatDate } from "../utilities";

const renderDateFromUnix = (time, dateFunc) => {
    let dateInput = time * 1000;
    return dateFunc(dateInput);
}

const renderDateFromUTC = (date, dateFunc) => {
    let dateInput = `${date} UTC`;
    return dateFunc(dateInput);
}

const formatPointSpread = (spread) => {
    if (spread && spread[0] !== "-") {
        return `+${spread}`;
    } else if (spread) {
        return spread;
    } else {
        return "PS";
    }
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
            rubric = formatPointSpread(bet.point_spread);
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
        // case 'Pending':
        //     color = 'gray';
        //     break;
        // case 'Loss':
        //     color = 'black';
        //     break;
        // case 'Win':
        //     color = 'blue';
        //     break;
    }
    let date = renderDateFromUnix(bet.game.unix_start_time, formatDate)
    let betPlacedDate = renderDateFromUTC(bet.created_at, formatDate);
    return (
        <div className="ui segments" style={{marginBottom: '20px'}}>
            <div className={`ui inverted secondary segment ${color}`}>
                <div className="ui middle aligned grid">
                    <div className="row">
                        <div className="eight wide column"><strong>${bet.wager}</strong> {side} {rubric} ({odds})</div>
                        <div className="eight wide right aligned column">
                            <strong>Bet placed: {betPlacedDate}</strong>
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