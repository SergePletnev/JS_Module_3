let arr = [
    {
        city: 'Amsterdam',
        title: 'This is Amsterdam!'
    },
    {
        city: 'Berlin',
        title: 'This is Berlin!'
    },
    {
        city: 'Budapest',
        title: 'This is Budapest!'
    }
];

const picked = arr.find(o => o.city === 'Amsterda');

console.log(picked === null);