import './App.css';

import Card from './card';

const rangs = [
    {rang: 6, value: 6},
    {rang: 7, value: 7},
    {rang: 8, value: 8},
    {rang: 9, value: 9},
    {rang: 10, value: 10},
    {rang: 11, value: 'V'},
    {rang: 12, value: 'D'},
    {rang: 13, value: 'K'},
    {rang: 14, value: 'T'},
];

const suits = [
    {color: 'red', value: '♥'},
    {color: 'red', value: '♦'},
    {color: 'black', value: '♣'},
    {color: 'black', value: '♠'},
]

// ♥/♡	♦/♢	♠/♤	♣/♧
const cards = [];

console.log({cards})


rangs.forEach( r =>
    suits.forEach( s =>
        cards.push( <Card key={s.value + r.value} rang={r.value} suit={s}/> )
    )
);

function App() {
  return (
    <div className="App">
        {cards}
        {}
        {}
    </div>
  );
}

export default App;
