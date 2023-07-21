import { WINNERCOMBOS } from "../constants";

export const checkWinner = (boardToCheck) => {
    for (const combo of WINNERCOMBOS) {
        const [a, b, c] = combo;
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a];
        }
    }

    // Si no hay ganador
    return null
}

export const checkEndGame = (newBoard) => {
    /* * Revisar si ha empate
       * Si no hay Espacios Vacios en el tablero
    */

    return newBoard.every((square) => square !== null)
}