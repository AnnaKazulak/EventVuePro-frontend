import moment from 'moment';

// Format for date like '24 January 2024'
export const formatDateLong = (date) => {
    return moment(date).format('DD MMMM YYYY');
};

// Format for date like '24.01.2024'
export const formatDateShort = (date) => {
    return moment(date).format('yyyy-MM-DD');
};