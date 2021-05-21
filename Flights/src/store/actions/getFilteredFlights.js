import { filterFlights, filterAirlines } from './flightActions';

export const getFilteredFlights = () => {
    return (dispatch, getState) => {
        const { flights, filters } = getState().flightReducer;
        let filtered = [];
        let airlines = [];

        // eslint-disable-next-line
        switch (filters[0]) {
            case "rise":
                filtered = flights.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount);
                break;
            case "fall":
                filtered = flights.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount);
                break;
            case "time":
                filtered = flights.sort((a, b) => a.flight.legs.reduce((sum, item) => sum + item.duration, 0) - b.flight.legs.reduce((sum, item) => sum + item.duration, 0));
                break;
        }

        /*if (filters[1].length > 1 ) {
            console.log(1);
            return filtered;
        } else if (filters[1].indexOf("withTransfer") !== -1) {
            console.log(2);
            filtered = filtered.map(flight => flight.flight.legs.filter(item => item.segments.length > 1));
        } else if (filters[1].indexOf("withoutTransfer") !== -1) {
            console.log(3);
            filtered = filtered.map(flight => flight.flight.legs.filter(item => item.segments.length < 2));
        }*/

        if (filters[2][1] > 0) {
            filtered = filtered.filter(item => item.flight.price.total.amount <= filters[2][1]);
        } else if (filters[2][0] >= 0) {
            filtered = filtered.filter(item => item.flight.price.total.amount >= filters[2][0]);
        }

        for (let i = 0; i < filtered.length; i++) {
            if (!airlines.includes(filtered[i].flight.carrier.caption)) {
                airlines.push(filtered[i].flight.carrier.caption);
            }
        }

        //airlines = filtered.filter(item => new Set(item.carrier.caption));
        console.log(airlines);

        dispatch(filterAirlines(airlines));
        dispatch(filterFlights(filtered));
    }
}
