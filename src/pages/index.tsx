import { useState } from 'react';
import styles from './index.module.css';

const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [1, 2, 0, 0, 0, 0, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const future = (turnColor: number) => {
    const boardassist = structuredClone(board);
    let y_f_check;
    let x_f_check;
    let flag;

    for (let y_count = 0; y_count < 8; y_count++) {
      for (let x_count = 0; x_count < 8; x_count++) {
        // 自分のターンの色探す
        if (board[y_count][x_count] === turnColor) {
          for (const dir of directions) {
            sameDirection: for (let n = 1; n < 8; n += 1) {
              const dx = dir[0] * n;
              const dy = dir[1] * n;
              // all directions check
              y_f_check = y_count + dy;
              x_f_check = x_count + dx;
              // console.log(y_check, x_check, turnColor);
              // 定義なくなるまでベクトル伸ばす
              if (board[y_f_check] !== undefined && board[y_f_check][x_f_check] !== undefined) {
                // 相手の色を通ることをflagで管理
                if (board[y_f_check][x_f_check] === 3 - turnColor) {
                  flag = true;
                  // 自分の色になったら中断しベクトル再選択
                } else if (board[y_f_check][x_f_check] === turnColor) {
                  flag = false;
                  break sameDirection;
                  // 空セルヒット
                } else if (board[y_f_check][x_f_check] === 0) {
                  if (flag === true) {
                    boardassist[y_f_check][x_f_check] = 3;
                    flag = false;
                    break sameDirection;
                  } else {
                    break sameDirection;
                  }
                }
              } else {
                flag = false;
                break;
              }
            }
          }
        }
      }
    }
    return boardassist;
  };
  const futureboard = future(turnColor);

  const clickHandler = (x: number, y: number) => {
    console.log(y, x);
    const newBoard = structuredClone(board);
    let y_check, x_check, color_flag;
    color_flag = false;
    if (board[y][x] === turnColor || board[y][x] === 3 - turnColor || futureboard[y][x] !== 3) {
      console.log('already placed or error');
    } else {
      for (const dir of directions) {
        for (let n = 1; n < 8; n += 1) {
          const dx = dir[0] * n;
          const dy = dir[1] * n;
          // all directions check
          y_check = y + dy;
          x_check = x + dx;

          if (board[y_check] !== undefined && board[y_check][x_check] !== undefined) {
            if (board[y_check][x_check] === turnColor) {
              console.log(y_check, x_check);

              for (let i = 0; i <= n; i += 1) {
                const rex = -dir[0] * i + x_check;
                const rey = -dir[1] * i + y_check;
                if (board[rey][rex] === 3 - turnColor) {
                  color_flag = true;
                }
                if (color_flag === true) {
                  newBoard[rey][rex] = turnColor;
                  newBoard[y][x] = turnColor;
                  setTurnColor(3 - turnColor);
                  color_flag = false;
                }
              }
            }
          }
        }
      }
      setBoard(newBoard);
    }
    //1.めくれる、点数 2.候補地 3.パス、2回パス
  };
  let black_p: number;
  let white_p: number;
  let color: number;
  let finish: number;
  let finish_flag;
  finish_flag = false;
  let currentPassed;
  let nextPassed;
  let colorPass;
  let blackPass = 0;
  let whitePass = 0;
  const Score = () => {
    black_p = 0;
    white_p = 0;
    finish = 0;
    currentPassed = false;
    nextPassed = false;
    // finish_flag = true;
    for (let row = 0; row < 8; row++) {
      //console.log('korroke');
      for (let column = 0; column < 8; column++) {
        color = futureboard[row][column];
        if (color === 1) {
          ++black_p;
        } else if (color === 2) {
          ++white_p;
        } else if (color === 3) {
          ++finish;
        }
      }
    }
    // finish = futureboard[row][column];
    if (finish === 0) {
      //finish_flag = false;
      currentPassed = true;
      colorPass = turnColor;
      if (colorPass === 1) {
        ++blackPass;
        setTurnColor(3-turnColor)
      } else if (colorPass === 2) {
        ++whitePass;
        setTurnColor(3-turnColor)
      }
      if (blackPass > 2) {
        alert('黒のパス回数が2回を超えたため終了します');
        finish_flag = true;
      } else if (whitePass > 2) {
        alert('白のパス回数が2回を超えたため終了します');
        finish_flag = true;
      }
      finish = 0;
    }
    if (currentPassed === true) {
      const futureboard = future(3 - turnColor);
      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          finish = futureboard[row][column];
          if (finish === 0) {
            nextPassed = true;
            finish = 0;
          }
        }
      }
    }
    if (nextPassed === true) {
      alert('両者置けるマスがなくなったため終了します。');
      finish_flag = true;
      // console.log('owari');
    }
    return (
      <>
        <div className={styles.score}>
          score: 黒:{black_p} 白:{white_p}
        </div>
        <div>{`${nextPassed === true ? '置けるマスがなくなったため終了します' : `黒のパス: ${blackPass} 白のパス: ${whitePass}`}`}</div>
      </>
    );
  };
  const What_color = () => {
    return (
      <div>
        <div className={styles.whatColor}>次は{`${turnColor === 1 ? '黒' : '白'}`}の番です。</div>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={`${finish_flag === true ? styles.finishBoardStyle : styles.boardStyle}`}>
        {futureboard.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : color === 2 ? '#fff' : '#ffff00' }}
                />
              )}
            </div>
          )),
        )}
      </div>
      <Score />
      <What_color />
    </div>
  );
};

export default Home;
