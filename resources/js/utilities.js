import React from 'react';
import queryString from 'query-string'

export const convertEuroOdds = odds => {
    if (odds < 2) {
        let num = odds - 1;
        return '-' + Math.round((1/num) * 100);
    } else {
        return '+' + Math.round((odds - 1) * 100);
    }
}

export const formatDate = dateInput => {
    let dateObj = new Date(dateInput);
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

export const parsePageParameter = (url, path) => {
    const query = url.replace(path, '');
    const values = queryString.parse(query);
    return values.page;
}