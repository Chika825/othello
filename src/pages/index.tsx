import { useState } from 'react';
import styles from './index.module.css';
//import { PassThrough } from 'stream';

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
    console.log(y, x);
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

    //座標設定が違う

    const color_reverse = () => {
      let n: number;
      n = y;
      let sc_check_y;
      sc_check_y = y;
      let m: number;
      m = x;

      //既存の場所設置禁止
      if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
        console.log('test');
      } else {
        // y+1,xの行の確認(下方向を参照する)
        // 自分のターンの色を探す、かつ定義内である必要あり
        while (board[sc_check_y][x] === turnColor || board[sc_check_y + 1] !== undefined) {
          // 自分の色があったら違う色すべてひっくり返す
          if (board[sc_check_y][x] === turnColor) {
            // さらに自分の色の一つ手前に違う色が存在することを確認 符号注意
            if (board[sc_check_y - 1][x] === 3 - turnColor) {
              // 挟まれた違う色をすべて反転
              while (board[n + 1][x] === 3 - turnColor) {
                ++n;
                newBoard[n][x] = turnColor;
              }
              //押した座標の色変更
              newBoard[y][x] = turnColor;
              setTurnColor(3 - turnColor);
            }
          }
          ++sc_check_y;
        }
      }
    };

    {
      if (board[y + 1] !== undefined && board[y + 1][x] === 3 - turnColor) {
        console.log('set1');
        color_reverse();
        //newBoard[y][x] = turnColor;
        //setTurnColor(3 - turnColor); //いかに分岐をなくすか
        // turnColor === 1 ? setTurnColor(2) : setTurnColor(1);
        // setTurnColor(turnColor === 1 ? 2 : 1);
        // setBoard(newBoard);
      } else if (board[y - 1] !== undefined && board[y - 1][x] === 3 - turnColor) {
        console.log('set2');
        color_reverse();
        //newBoard[y][x] = turnColor;
        //setTurnColor(3 - turnColor);
        //setBoard(newBoard);
      } else if (board[x + 1] !== undefined && board[y][x + 1] === 3 - turnColor) {
        console.log('set3');
        color_reverse();
        //newBoard[y][x] = turnColor;
        //setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } else if (board[x - 1] !== undefined && board[y][x - 1] === 3 - turnColor) {
        console.log('set4');
        color_reverse();
        //newBoard[y][x] = turnColor;
        //setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } else if (board[y + 1][x + 1] !== undefined && board[y + 1][x + 1] === 3 - turnColor) {
        //これ以降の分はこれより上に分岐させる必要があるかも？
        console.log('set5');
        color_reverse();
        //newBoard[y][x] = turnColor;
        //setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } else if (board[y - 1][x + 1] !== undefined && board[y - 1][x + 1] === 3 - turnColor) {
        console.log('set6');
        color_reverse();
        //newBoard[y][x] = turnColor;
        //setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } else if (board[y + 1][x - 1] !== undefined && board[y + 1][x - 1] === 3 - turnColor) {
        console.log('set7');
        color_reverse();
        //newBoard[y][x] = turnColor;
        //setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      } else if (board[y - 1][x - 1] !== undefined && board[y - 1][x - 1] === 3 - turnColor) {
        console.log('set8');
        color_reverse();
        //newBoard[y][x] = turnColor;
        //setTurnColor(3 - turnColor);
        // setBoard(newBoard);
      }
    }
    setBoard(newBoard);

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
