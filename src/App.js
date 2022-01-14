import { useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList.js/CardList';

const cardImages = [
  { "src": "/img/helmet-1.png", 'matched': false },
  { "src": "/img/potion-1.png", 'matched': false },
  { "src": "/img/ring-1.png", 'matched': false },
  { "src": "/img/scroll-1.png", 'matched': false },
  { "src": "/img/shield-1.png", 'matched': false },
  { "src": "/img/sword-1.png", 'matched': false },
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setCoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shufle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}));

    setCoiceOne(null);
    setChoiceTwo(null);
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
    setDisabled(false)
  }
  //checking if choices match
  useEffect(() => {
    if (choiceTwo && choiceOne) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevcards => (
          prevcards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        ))
        setTimeout(() => {
          reset()
        }, 1000) 
      } else {
        setTimeout(() => {
          reset()
        }, 1000) 
      }
    }
  },[choiceTwo, choiceOne])
  
  //start new game autamativally
  useEffect(() => {
    shuffleCards()
  }, [])

  
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <CardList cards={cards} handleChoice={handleChoice} choiceOne={choiceOne} choiceTwo={choiceTwo} disabled={disabled}/>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
