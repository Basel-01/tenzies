import React from 'react';
import './App.css';
import Die from "./components/Die";
import {nanoid} from "nanoid"

function App() {

  let [dice, setDice] = React.useState(allNewDice())
  let [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    let firstDieValue = dice[0].value
    setTenzies(dice.every(die => {
      if(die.isHeld) {
        return die.value === firstDieValue
      }
      return false
    }))
  }, [dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.floor(Math.random() * 6),
      isHeld: false,
    }
  }

  function allNewDice() {
    let newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
      console.log(newDice)
    }
    return newDice
  }

  let diceElements = dice.map(die => 
    <Die key={die.id} die={die} holdDice={holdDice} />
  )

  function holdDice(clickedId) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === clickedId ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function rollDice(e) {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setDice(allNewDice())
    }
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
