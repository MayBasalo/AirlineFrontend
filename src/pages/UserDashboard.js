import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/UserDashboard.css'; // make sure this file exists

const UserDashboard = ({
  flights = [],
  passengers = [],
  airports = [],
  aircraft = [],
  airlines = [],
  cities = [],
}) => {
  const navigate = useNavigate();
  const [view, setView] = useState('flights');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    if (!isLoggedIn || role !== 'user') {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const renderTable = () => {
    const wrapTable = (headers, rows) => (
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.length > 0 ? rows : <tr><td colSpan={headers.length}>No data available</td></tr>}
          </tbody>
        </table>
      </div>
    );

    switch (view) {
      case 'flights':
        return wrapTable(
          ['Origin', 'Destination', 'Airline', 'Departure', 'Arrival'],
          flights?.map(flight => (
            <tr key={flight.id}>
              <td>{flight.originAirportCode}</td>
              <td>{flight.destinationAirportCode}</td>
              <td>{flight.airlineName}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
            </tr>
          )) || []
        );
      case 'passengers':
        return wrapTable(
          ['First Name', 'Last Name', 'Email', 'Phone', 'Passport'],
          passengers?.map(p => (
            <tr key={p.id}>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.email}</td>
              <td>{p.phoneNumber}</td>
              <td>{p.passportNumber}</td>
            </tr>
          )) || []
        );
      case 'airports':
        return wrapTable(
          ['Name', 'Code', 'City'],
          airports?.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.code}</td>
              <td>{a.city?.name || 'N/A'}</td>
            </tr>
          )) || []
        );
      case 'aircraft':
        return wrapTable(
          ['Model', 'Manufacturer', 'Capacity'],
          aircraft?.map(a => (
            <tr key={a.id}>
              <td>{a.model}</td>
              <td>{a.manufacturer}</td>
              <td>{a.capacity}</td>
            </tr>
          )) || []
        );
      case 'airlines':
        return wrapTable(
          ['Name', 'Code', 'Country'],
          airlines?.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.code}</td>
              <td>{a.country}</td>
            </tr>
          )) || []
        );
      case 'cities':
        return wrapTable(
          ['Name', 'State', 'Population'],
          cities?.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.state}</td>
              <td>{c.population}</td>
            </tr>
          )) || []
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>

      <div className="view-toggle">
        {['flights', 'passengers', 'airports', 'aircraft', 'airlines', 'cities'].map(type => (
          <button
            key={type}
            className={view === type ? 'active' : ''}
            onClick={() => setView(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {renderTable()}

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout / Back to Login
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
