import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {
  transactionsData: [
    { id: 1, name: 'Starbucks', amount: "12.00", date: '2024-03-21', location: { city: 'New York', province: 'NY' } },
    { id: 2, name: 'Apple Store', amount: "101.00", date: '2024-04-20', location: { city: 'Los Angeles', province: 'CA' } },
    { id: 3, name: 'Sephora', amount: "12.00", date: '2024-05-05', location: { city: 'London', province: 'ENG' } },
    { id: 4, name: 'Shoppers Drug Mart', amount: "24.00", date: '2024-03-10', location: { city: 'Paris', province: 'FRA' } },
    { id: 5, name: 'Pizza Hut', amount: "24.00", date: '2024-12-21', location: { city: 'Tokyo', province: 'JPN' } },
    { id: 6, name: 'Cheesecake Factory', amount: "45.00", date: '2024-01-09', location: { city: 'Berlin', province: 'GER' } },
    { id: 7, name: 'Nike', amount: "450.00", date: '2024-03-21', location: { city: 'Sydney', province: 'NSW' } },
    { id: 8, name: 'Tim Hortons', amount: "7.89", date: '2024-06-21', location: { city: 'Toronto', province: 'ON' } },
    { id: 9, name: 'Whole Foods', amount: "78.00", date: '2024-035-25', location: { city: 'Vancouver', province: 'BC' } },
    { id: 10, name: 'Cineplex', amount: "42.50", date: '2024-03-01', location: { city: 'Montreal', province: 'QC' } }
  ]
};

const store = createStore(reducer, initialState);

export default store;
