import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" },
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setCoiceOne] = useState(null);
  const[choiceTwo, setChoiceTwo] = useState(null)

  //shufle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}));

    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  const handleChoice = card => {
    choiceOne ? setChoiceTwo(card) : setCoiceOne(card)
    console.log(choiceOne, choiceTwo)
  };

  //rest choice
  const reset = () => {
    setCoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevturns => prevturns + 1)
  }
  //checking if choices match
  useEffect(() => {
    if (choiceTwo && choiceOne) {
      if (choiceOne.src === choiceTwo.src) {
        console.log('those cards match')
        reset()
      } else {
        console.log('those cards do not match')
        reset()
      }
    }

  },[choiceTwo, choiceOne])
  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <Card 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
