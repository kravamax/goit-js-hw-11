import numeral from 'numeral';

numeral.register('locale', 'fr', {
  delimiters: {
    thousands: '',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm+',
    billion: 'b+',
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème';
  },
});

// switch between locales
numeral.locale('fr');
