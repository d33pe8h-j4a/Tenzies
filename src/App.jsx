import { useState, useEffect } from "react";
import Die from "./components/die";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
    const [game, setGame] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [rolls, setRolls] = useState(0);

    useEffect(() => {
        if (startTime && !endTime) {
            const timer = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1000); // Update every second

            return () => clearInterval(timer);
        }
    }, [startTime, endTime]);

    useEffect(() => {
        let allAreHeld = true;
        let allWithSameValue = true;
        dice.forEach((die) => {
            allAreHeld = allAreHeld && die.isHeld;
            allWithSameValue = allWithSameValue && die.value;
        });
        if (allAreHeld && allWithSameValue) {
            setTenzies(true);
            setEndTime(Date.now());
        }
    }, [dice]);

    function getRandom() {
        return Math.ceil(Math.random() * 6);
    }

    function getNewDice() {
        return {
            id: nanoid(),
            value: getRandom(),
            isHeld: false,
        };
    }

    function allNewDice() {
        const diceArray = [];
        for (let i = 0; i < 10; i++) {
            diceArray.push(getNewDice());
        }
        return diceArray;
    }

    function rollDice() {
        if (tenzies) {
            setTenzies(false);
            setDice(allNewDice());
            setRolls(0);
            setStartTime(Date.now());
            setEndTime(null);
        } else {
            setDice((prevDice) =>
                prevDice.map((die) => {
                    return die.isHeld ? die : getNewDice();
                })
            );
            setRolls((prevRolls) => prevRolls + 1);
        }
    }

    function holdDice(id) {
        setDice((prevDice) =>
            prevDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    function startGame() {
        setGame(true);
        setStartTime(Date.now());
    }

    const diceElements = dice.map((die) => (
        <Die key={die.id} {...die} toggleHold={() => holdDice(die.id)} />
    ));

    return (
        <>
            {game ? (
                <main>
                    {tenzies && <Confetti />}
                    <div className="main-text">
                        <h1 className="title">Tenzies</h1>
                        <p className="instructions">
                            Roll until all dice are the same. Click each die to
                            freeze it at its current value between rolls.
                        </p>
                    </div>
                    <div className="dice-container">{diceElements}</div>
                    <button className="roll-dice" onClick={rollDice}>
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                    <h2>Rolls: {rolls}</h2>
                    {endTime ? (
                        <div>
                            Time taken: {Math.floor(elapsedTime / 1000)} seconds
                        </div>
                    ) : (
                        <div>
                            Time elapsed: {Math.floor(elapsedTime / 1000)}{" "}
                            seconds
                        </div>
                    )}
                </main>
            ) : (
                <>
                    <button className="start-game-btn" onClick={startGame()}>
                        START GAME
                    </button>
                </>
            )}
        </>
    );
}

export default App;

// Extra Credit

// o CSS: put real dots on the dice.✅
// o Track the number of rolls ✅
// o Track the time it took to win ✅
// o Save your best time to localStorage
