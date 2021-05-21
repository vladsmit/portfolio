import { filterFlights, filterAirlines } from './flightActions';

export const getFilteredFlights = () => {
    return (dispatch, getState) => {
        const { flights, filters } = getState().flightReducer;
        let filtered = [...flights];
        let filteredWithAirlines = [];
        let airlines = [];
        let segmentFiltered = [];


        if (filters[1].length === 1) {
            // eslint-disable-next-line
            switch (filters[1][0]) {
                case "withTransfer":
                    for (let i = 0; i < filtered.length; i++) {
                        let findSegments = filtered[i].flight.legs.find(item => item.segments.length > 1);
                        if (findSegments) {
                            segmentFiltered.push(filtered[i]);
                        }
                    }
                    break;
                case "withoutTransfer":
                    for (let i = 0; i < filtered.length; i++) {
                        let findSegments = 0;
                        for (let j = 0; j < filtered[i].flight.legs.length; j++) {
                            if (filtered[i].flight.legs[j].segments.length < 2) {
                                findSegments++;
                            }
                        }
                        if (findSegments === 2) {
                            segmentFiltered.push(filtered[i]);
                        }
                    }
                    break;
            }
            filtered = segmentFiltered.slice();
        }

        /**
         * фильтр по стоимости
         */
        if (filters[2][0] >= 0 && filters[2][1] > 0) {
            filtered = filtered.filter(item => (item.flight.price.total.amount >= filters[2][0] && item.flight.price.total.amount <= filters[2][1]));
        } else if ((filters[2][0] > filters[2][1]) || (filters[2][0] === 0 && filters[2][1] === 0)) {
            return filtered;
        } else if (filters[2][0] >= 0) {
            filtered = filtered.filter(item => item.flight.price.total.amount >= filters[2][0]);
        } else if (filters[2][1] > 0) {
            filtered = filtered.filter(item => item.flight.price.total.amount <= filters[2][1]);
        }

        /**
         * фильтрация уникальных авиакомпаний для отображения в блоке с фильтрами
         */
        filtered = filtered.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount);
        for (let i = 0; i < filtered.length; i++) {
            // eslint-disable-next-line
            let findAirline = airlines.find(item => item.flight.carrier.caption === filtered[i].flight.carrier.caption);
            if (!findAirline) {
                airlines.push(filtered[i]);
            }
        }

        dispatch(filterAirlines(airlines));

        /**
         * сортировка по трем вариантам (по возрастанию, по убыванию и по суммарному времени)
         */
        // eslint-disable-next-line
        switch (filters[0]) {
            case "rise":
                filtered = filtered.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount);
                break;
            case "fall":
                filtered = filtered.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount);
                break;
            case "time":
                filtered = filtered.sort((a, b) => a.flight.legs.reduce((sum, item) => sum + item.duration, 0) - b.flight.legs.reduce((sum, item) => sum + item.duration, 0));
                break;
        }

        dispatch(filterFlights(filtered));

        /**
         * фильтрация списка по выбранным авиакомпаниям в блоке фильтрации
         */
        if (filters[3].length > 0) {
            for (let i = 0; i < filters[3].length; i++) {
                let findAirline = filtered.filter(item => item.flight.carrier.caption === filters[3][i]);
                if (findAirline) {
                    filteredWithAirlines.push(...findAirline);
                }
            }
            // eslint-disable-next-line
            switch (filters[0]) {
                case "rise":
                    filteredWithAirlines = filteredWithAirlines.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount);
                    break;
                case "fall":
                    filteredWithAirlines = filteredWithAirlines.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount);
                    break;
                case "time":
                    filteredWithAirlines = filteredWithAirlines.sort((a, b) => a.flight.legs.reduce((sum, item) => sum + item.duration, 0) - b.flight.legs.reduce((sum, item) => sum + item.duration, 0));
                    break;
            }
            dispatch(filterFlights(filteredWithAirlines));
        }

    }
}
