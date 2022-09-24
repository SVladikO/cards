import './App.css';

import Card from './card';

const rangs = [6, 7, 8, 9, 10, 'V', 'D', 'K', 'T'];
const suits = ['cherva', 'byba', 'hrest', 'pika']
const cards = [];

console.log({cards})

rangs.forEach( r =>
    suits.forEach( s =>
        cards.push( <Card key={s + r} suit={s} rang={r} /> )
    )
);

function App() {
  return (
    <div className="App">
        {cards}
    </div>
  );
}

export default App;
