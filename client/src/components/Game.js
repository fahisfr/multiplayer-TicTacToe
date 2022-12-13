import "../styles/game.scss";
import React, { useEffect, useState } from "react";

const initialBoard = ["", "", "", "", "", "", "", "", ""];

function Game({ socket, room }) {
  const [canPay, setCanPlay] = useState(true);
  const [board, setBoard] = useState(initialBoard);
  const [gameResult, setGameResult] = useState("");
  const [playAgin, setPlayAgin] = useState({
    me: false,
    opponent: false,
  });
  const resetGame = () => {
    setBoard(initialBoard);
    setCanPlay(true);
    setPlayAgin({ me: false, opponent: true });
    setGameResult("");
  };
  const updateGame = (index, text) => {
    const oldBoard = [...board];
    oldBoard[index] = text;
    setCanPlay(!canPay);
    setBoard(oldBoard);
  };
  useEffect(() => {
    socket.on("update-game", (index) => {
      updateGame(index, "o");
      setCanPlay(true);
    });
    socket.on("reset", () => {
      if (playAgin.me) {
        resetGame();
      }
      setPlayAgin({
        me: false,
        opponent: true,
      });
    });
  });
  useEffect(() => {
    const combs = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let comb of combs) {
      if (
        board[comb[0]] === board[comb[1]] &&
        board[comb[1]] === board[comb[2]] &&
        board[comb[0]] !== ""
      ) {
        setGameResult(board[comb[[0]]] === "x" ? "you woin" : "you losse");
      }
    }

    if (!board.includes("")) {
      setGameResult("drew");
    }
  }, [board]);

  const onClick = (index) => {
    if (canPay && board[index] === "") {
      socket.emit("play", { index, room });
      updateGame(index, "x");
    }
  };

  const playAginNow = () => {
    socket.emit("play-agin", room);
    if (playAgin.opponent) {
      resetGame();
      return;
    }
    setPlayAgin({
      me: true,
      opponent: false,
    });
  };

  return (
    <div className="game-container">
      {gameResult && (
        <div className="gameresult">
          <div className="gr">
            <h1>{gameResult}</h1>
            <button onClick={playAginNow}>
              {playAgin.me ? "Waiting for your opponent" : "Play Agin"}
            </button>
          </div>
        </div>
      )}

      <div className="game-wrappe">
        <div className={`cell-wrappe`}>
          {board?.map((cell, index) => {
            return (
              <div key={index} className="cell" onClick={() => onClick(index)}>
                <span>{cell}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Game;
