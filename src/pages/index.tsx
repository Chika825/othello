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

  const future = () => {
    let color;
    let place;
    //console.log('test');
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        color = board[row][column];
        if (color === turnColor) {
          console.log(row, column);
          // y+1,x
          while (board[row] !== undefined || board[row][column] !== turnColor) {
            console.log('y+1,x check');
            // チェックしようとしている一つ先のマスが未定義の場合中止
            // また隣の色が置こうとしている色と同じである場合中止
            if (board[row + 1] === undefined || board[row + 1][column] === turnColor) {
              break;
            }
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
                // 色変更フラグの変更(こうしないと複数変わるとき色バグる)
                color_change = true;
                //setTurnColor(3 - turnColor);
                //console.log('--color change');
              }
            }
            ++sc_check_y;
            // チェックしようとしている一つ先のマスが未定義の場合中止
            // さらに空のマスが無いか確認
            if (board[sc_check_y] === undefined || board[sc_check_y][x] === 0) {
              console.log('empty cell');
              break;
            }
          }
          sc_check_y = y;
          n = y;
        }
      }
    }
  };
  future();
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

    let color_change;
    color_change = false;

    const color_reverse = () => {
      let n: number;
      n = y;
      let sc_check_y;
      sc_check_y = y;
      let m: number;
      m = x;
      let sc_check_x;
      sc_check_x = x;

      //既存の場所設置禁止
      if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
        console.log('already placed');
      } else {
        console.log('rule 1 ok');
        // y+1,xの行の確認(下方向を参照する)
        // 自分のターンの色を探す、かつ定義内である必要あり
        // Attention!! 下記の!==turnColorは===から変更しました
        while (board[sc_check_y] !== undefined || board[sc_check_y][x] !== turnColor) {
          console.log('y+1,x check');
          // チェックしようとしている一つ先のマスが未定義の場合中止
          // また隣の色が置こうとしている色と同じである場合中止
          if (board[n + 1] === undefined || board[n + 1][x] === turnColor) {
            break;
          }
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
              // 色変更フラグの変更(こうしないと複数変わるとき色バグる)
              color_change = true;
              //setTurnColor(3 - turnColor);
              //console.log('--color change');
            }
          }
          ++sc_check_y;
          // チェックしようとしている一つ先のマスが未定義の場合中止
          // さらに空のマスが無いか確認
          if (board[sc_check_y] === undefined || board[sc_check_y][x] === 0) {
            console.log('empty cell');
            break;
          }
        }
        sc_check_y = y;
        n = y;
        // y-1,x(上方向の行を確認)
        while (board[sc_check_y] !== undefined || board[sc_check_y][x] !== turnColor) {
          console.log('y-1,x check');
          if (board[n - 1] === undefined || board[n - 1][x] === turnColor) {
            break;
          }
          if (board[sc_check_y][x] === turnColor) {
            if (board[sc_check_y + 1][x] === 3 - turnColor) {
              while (board[n - 1][x] === 3 - turnColor) {
                --n;
                newBoard[n][x] = turnColor;
              }
              newBoard[y][x] = turnColor;
              color_change = true;
              //setTurnColor(3 - turnColor);
              //console.log('--color change');
            }
          }
          --sc_check_y;
          if (board[sc_check_y] === undefined || board[sc_check_y][x] === 0) {
            console.log('empty cell');
            break;
          }
        }
        sc_check_y = y;
        n = y;
        // y,x+1(右方向の列を確認)
        while (board[sc_check_x] !== undefined || board[y][sc_check_x] !== turnColor) {
          console.log('y,x+1 check');
          if (board[m + 1] === undefined || board[y][m + 1] === turnColor) {
            break;
          }
          if (board[y][sc_check_x] === turnColor) {
            if (board[y][sc_check_x - 1] === 3 - turnColor) {
              while (board[y][m + 1] === 3 - turnColor) {
                ++m;
                newBoard[y][m] = turnColor;
              }
              newBoard[y][x] = turnColor;
              color_change = true;
              //setTurnColor(3 - turnColor);
              //console.log('--color change');
            }
          }
          ++sc_check_x;
          if (board[sc_check_x] === undefined || board[y][sc_check_x] === 0) {
            console.log('empty cell');
            break;
          }
        }
        sc_check_x = x;
        m = x;
        // y,x-1(左方向の列を確認)
        while (board[sc_check_x] !== undefined || board[y][sc_check_x] !== turnColor) {
          console.log('y,x-1 check');
          if (board[m - 1] === undefined || board[y][m - 1] === turnColor) {
            break;
          }
          if (board[y][sc_check_x] === turnColor) {
            if (board[y][sc_check_x + 1] === 3 - turnColor) {
              while (board[y][m - 1] === 3 - turnColor) {
                --m;
                newBoard[y][m] = turnColor;
              }
              newBoard[y][x] = turnColor;
              color_change = true;
              //setTurnColor(3 - turnColor);
              //console.log('--color change');
            }
          }
          --sc_check_x;
          if (board[sc_check_x] === undefined || board[y][sc_check_x] === 0) {
            console.log('empty cell');
            break;
          }
        }
        sc_check_x = x;
        m = x;
        // y+1,x+1(右斜め下方向を確認)
        while (
          board[sc_check_y] !== undefined ||
          board[sc_check_x] !== undefined ||
          board[sc_check_y][sc_check_x] !== turnColor
        ) {
          console.log('y+1,x+1 check');
          if (
            board[n + 1] === undefined ||
            board[m + 1] === undefined ||
            board[n + 1][m + 1] === turnColor
          ) {
            break;
          }
          if (board[sc_check_y][sc_check_x] === turnColor) {
            if (board[sc_check_y - 1][sc_check_x - 1] === 3 - turnColor) {
              while (board[n + 1][m + 1] === 3 - turnColor) {
                ++n;
                ++m;
                newBoard[n][m] = turnColor;
              }
              newBoard[y][x] = turnColor;
              color_change = true;
              //setTurnColor(3 - turnColor);
              //console.log('--color change');
            }
          }
          ++sc_check_y;
          ++sc_check_x;
          if (
            board[sc_check_y] === undefined ||
            board[sc_check_x] === undefined ||
            board[sc_check_y][sc_check_x] === 0
          ) {
            console.log('empty cell');
            break;
          }
        }
        sc_check_y = y;
        sc_check_x = x;
        n = y;
        m = x;
        // y+1,x-1(左斜め下方向を確認)
        while (
          board[sc_check_y] !== undefined ||
          board[sc_check_x] !== undefined ||
          board[sc_check_y][sc_check_x] !== turnColor
        ) {
          console.log('y+1,x-1 check');
          if (
            board[n + 1] === undefined ||
            board[m - 1] === undefined ||
            board[n + 1][m - 1] === turnColor
          ) {
            break;
          }
          if (board[sc_check_y][sc_check_x] === turnColor) {
            if (board[sc_check_y - 1][sc_check_x + 1] === 3 - turnColor) {
              while (board[n + 1][m - 1] === 3 - turnColor) {
                ++n;
                --m;
                newBoard[n][m] = turnColor;
              }
              newBoard[y][x] = turnColor;
              color_change = true;
              //setTurnColor(3 - turnColor);
              //console.log('--color change');
            }
          }
          ++sc_check_y;
          --sc_check_x;
          if (
            board[sc_check_y] === undefined ||
            board[sc_check_x] === undefined ||
            board[sc_check_y][sc_check_x] === 0
          ) {
            console.log('empty cell');
            break;
          }
        }
        sc_check_y = y;
        sc_check_x = x;
        n = y;
        m = x;
        // y-1,x-1(左斜め上方向を確認)
        while (
          board[sc_check_y] !== undefined ||
          board[sc_check_x] !== undefined ||
          board[sc_check_y][sc_check_x] !== turnColor
        ) {
          console.log('y-1,x-1 check');
          if (
            board[n - 1] === undefined ||
            board[m - 1] === undefined ||
            board[n - 1][m - 1] === turnColor
          ) {
            break;
          }
          if (board[sc_check_y][sc_check_x] === turnColor) {
            if (board[sc_check_y + 1][sc_check_x + 1] === 3 - turnColor) {
              while (board[n - 1][m - 1] === 3 - turnColor) {
                --n;
                --m;
                newBoard[n][m] = turnColor;
              }
              newBoard[y][x] = turnColor;
              color_change = true;
              //setTurnColor(3 - turnColor);
              //console.log('--color change');
            }
          }
          --sc_check_y;
          --sc_check_x;
          if (
            board[sc_check_y] === undefined ||
            board[sc_check_x] === undefined ||
            board[sc_check_y][sc_check_x] === 0
          ) {
            console.log('empty cell');
            break;
          }
        }
        sc_check_y = y;
        sc_check_x = x;
        n = y;
        m = x;
        // y-1,x+1(右斜め上方向を確認)
        while (
          board[sc_check_y] !== undefined ||
          board[sc_check_x] !== undefined ||
          board[sc_check_y][sc_check_x] !== turnColor
        ) {
          console.log('y-1,x+1 check');
          if (
            board[n - 1] === undefined ||
            board[m + 1] === undefined ||
            board[n - 1][m + 1] === turnColor
          ) {
            break;
          }
          if (board[sc_check_y][sc_check_x] === turnColor) {
            if (board[sc_check_y + 1][sc_check_x - 1] === 3 - turnColor) {
              while (board[n - 1][m + 1] === 3 - turnColor) {
                --n;
                ++m;
                newBoard[n][m] = turnColor;
              }
              newBoard[y][x] = turnColor;
              color_change = true;
              //setTurnColor(3 - turnColor);
              //console.log('--color change');
            }
          }
          --sc_check_y;
          ++sc_check_x;
          if (
            board[sc_check_y] === undefined ||
            board[sc_check_x] === undefined ||
            board[sc_check_y][sc_check_x] === 0
          ) {
            console.log('empty cell');
            break;
          }
        }
        sc_check_y = y;
        sc_check_x = x;
        n = y;
        m = x;
      }
    };

    console.log('---Start Check---');
    color_reverse();
    setBoard(newBoard);
    if (color_change === true) {
      setTurnColor(3 - turnColor);
      console.log('--color-change');
    }
    color_change = false;
    console.log('---Ended Check---');

    //1.めくれる、点数 2.候補地 3.パス、2回パス
    // userStateを一つ増やす(候補地)
  };
  let black_p: number;
  let white_p: number;
  let score_points_b: number;
  let score_points_w: number;
  let color: number;
  black_p = 0;
  white_p = 0;
  const Score = () => {
    for (let row = 0; row < 8; row++) {
      //console.log('korroke');
      for (let column = 0; column < 8; column++) {
        color = board[row][column];
        if (color === 1) {
          ++black_p;
        } else if (color === 2) {
          ++white_p;
        }
      }
    }
    score_points_b = black_p;
    score_points_w = white_p;
    return (
      <div className={styles.score} suppressHydrationWarning={true}>
        score: 黒:{score_points_b / 2} 白:{score_points_w / 2}
      </div>
    );
  };
  const What_color = () => {
    return (
      <div>
        <div className={styles.whatcolor}>次は{`${turnColor === 1 ? '黒' : '白'}`}の番です。</div>
      </div>
    );
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
