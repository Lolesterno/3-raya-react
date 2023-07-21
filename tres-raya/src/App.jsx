import { useState } from "react";
import confetti from 'canvas-confetti';
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToLocalStorage, resetGameStorage } from "./logic/storage/index.js";

function App() {
  const [board, setBoard] = useState(() => {

    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);

  });

  const [turn, setTurn] = useState(() => {
    const turnsFromStorage = window.localStorage.getItem('turn');
    return turnsFromStorage ?? TURNS.X
  });

  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {

    // No s Actualiza la posicion si ya tiene algo
    if (board[index] || winner) return;

    // Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Cambio de turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardar Partida
    saveGameToLocalStorage({
      board: newBoard,
      turn: newTurn
    }); 

    // Revisar si hay ganados
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      // Ganador

      confetti();
      setWinner(newWinner);

    } else if (checkEndGame(newBoard)) {

      setWinner(false); //Empate

    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage();

  }

  return (
    <main className="board">
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Reiniciar el Juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
