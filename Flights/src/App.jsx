import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { fetchFlights } from './store/actions/getFlightsFromJson';
import { getFilteredFlights } from './store/actions/getFilteredFlights';
import { spinnerSwitch, addFilters } from './store/actions/flightActions';
import './styles/styles.scss';

import TicketPage from './pages/TicketPage';

const App = ({ fetchFlights, getFilteredFlights, addFilters, filteredFlights, error, loading, filteredAirlines, spinnerSwitch }) => {
  const [sortType, setSortType] = useState(() => {
    return 'rise';
  });

  const [filterType, setFilterType] = useState(() => {
    return [];
  });

  const [priceFrom, setPriceFrom] = useState(() => {
    return null;
  });

  const [priceTo, setPriceTo] = useState(() => {
    return null;
  });

  const [airlines, setAirlines] = useState(() => {
    return [];
  });

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  const handleGetFlights = useCallback(() => {
    spinnerSwitch(true);
    addFilters({
      sort: sortType,
      filter: filterType,
      priceFrom: priceFrom,
      priceTo: priceTo,
      airlines: airlines
    });
    getFilteredFlights();
    setTimeout(() => {
      spinnerSwitch(false);
    }, 1000);
  }, [spinnerSwitch, addFilters, getFilteredFlights, sortType, filterType, priceFrom, priceTo, airlines]);

  const handleSortTypeStatus = useCallback(e => {
    setSortType(() => {
      return e.target.value;
    });
  }, []);

  const handleFilterTypeStatus = useCallback(checkedValues => {
    setFilterType(() => {
      return checkedValues;
    });
  }, []);

  const handlePriceFromStatus = useCallback(e => {
    setPriceFrom(() => {
      return +e.target.value;
    });
  }, []);

  const handlePriceToStatus = useCallback(e => {
    setPriceTo(() => {
      return +e.target.value;
    });
  }, []);

  const handleAirlinesStatus = useCallback(checkedValues => {
    setAirlines(() => {
      return checkedValues;
    });
  }, []);

  return <TicketPage filteredFlights={filteredFlights} sortType={sortType} loading={loading} error={error} sortTypeStatus={handleSortTypeStatus} filterTypeStatus={handleFilterTypeStatus} priceFromStatus={handlePriceFromStatus} priceToStatus={handlePriceToStatus} airlinesStatus={handleAirlinesStatus} getFlights={handleGetFlights} filteredAirlines={filteredAirlines} />
}

App.propTypes = {
  fetchFlights: PropTypes.func,
  spinnerSwitch: PropTypes.func,
  getFilteredFlights: PropTypes.func,
  addFilters: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  filteredFlights: PropTypes.array,
  filteredAirlines: PropTypes.array,
}

const mapStateToProps = ({ flightReducer }) => ({
  error: flightReducer.error,
  loading: flightReducer.loading,
  filteredAirlines: flightReducer.filteredAirlines,
  filteredFlights: flightReducer.filteredFlights,
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchFlights, spinnerSwitch, getFilteredFlights, addFilters }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
