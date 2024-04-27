import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);
    /*
    const directions = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
      [-1, -1],
      [1, 1],
      [-1, 1],
      [1, -1],
    ];
    directions.forEach(function (zh) {
      if (board[y + zh[1]] !== undefined && board[y + zh[1]][x + zh[0]] === 3 - turnColor) {
        console.log(y + zh[1], x + zh[0]);
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        setBoard(newBoard);
      } else if (board[x + zh[0]] !== undefined && board[y + zh[1]][x + zh[0]] === 3 - turnColor) {
        console.log(y + zh[1], x + zh[0]);
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        setBoard(newBoard);
      }
    });
    */
    /*
    directions.forEach(function (zh) {
      if (board[y + zh[1]][x + zh[0]] === 3 - turnColor) {
        newBoard[y + zh[1]][x + zh[0]] = turnColor;
        setBoard(newBoard);
      }
    });
  */
    let n;
    n = y;

    {
      if (board[y + 1] !== undefined && board[y + 1][x] === 3 - turnColor) {
        // 色をひっくり返す

        while (board[n + 1][x] !== turnColor && board[n + 2][x] === turnColor) {
          if (board[n + 1][x] === 0) {
            break;
          }
          while (board[n + 2][x] !== turnColor) {
            if (board[n + 2][x] === 0) {
              break;
            }
            n++;
          }
          /*
          if (board[n + 2][x] !== turnColor) {
            console.log("korroke")
            break;
          }
          */
          n++;
          newBoard[n][x] = turnColor;
          //setBoard(newBoard);
        }
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor); //いかに分岐をなくすか
        // turnColor === 1 ? setTurnColor(2) : setTurnColor(1);
        // setTurnColor(turnColor === 1 ? 2 : 1);
        // setBoard(newBoard);
      } else if (board[y - 1] !== undefined && board[y - 1][x] === 3 - turnColor) {
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        //setBoard(newBoard);
      } else if (board[x + 1] !== undefined && board[y][x + 1] === 3 - turnColor) {
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } else if (board[x - 1] !== undefined && board[y][x - 1] === 3 - turnColor) {
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } /*else if (board[y + 1][x + 1] !== undefined && board[y + 1][x + 1] === 3 - turnColor) {
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } else if (board[y - 1][x + 1] !== undefined && board[y - 1][x + 1] === 3 - turnColor) {
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } else if (board[y + 1][x - 1] !== undefined && board[y + 1][x - 1] === 3 - turnColor) {
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } else if (board[y - 1][x - 1] !== undefined && board[y - 1][x - 1] === 3 - turnColor) {
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      }*/
    }
    setBoard(newBoard);

    //setBoard(newBoard);
    //const directions
    //1.めくれる、点数 2.候補地 3.パス、2回パス
    //npm run dev
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
