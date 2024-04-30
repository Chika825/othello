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

    const color_reverse = () => {
      let n;
      n = y;
      let m;
      m = x;
      // 色をひっくり返す
      // 
      color_reverse_break1: while (board[n + 1][x] !== turnColor) {
        if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
          break;
        }
        if (board[n + 1][x] === 0) {
          break;
        }
        while (board[n + 2][x] !== turnColor) {
          if (board[n + 2][x] === 0) {
            break color_reverse_break1;
          }
          ++n;
          if (board[n + 1][x] === turnColor) {
            break color_reverse_break1;
          }
          newBoard[n][x] = turnColor;
          console.log('hikkuri'); //最初の色だけ引っ掛ける
        }
        while (board[n + 1][x] === 3 - turnColor) {
          if (board[n + 1][x] === 0) {
            break color_reverse_break1;
          }
          ++n;
          newBoard[n][x] = turnColor;
          console.log('test1');
        }
        /*
        if (board[n + 2][x] !== turnColor) {
          console.log("korroke")
          break;
        }
        */
        ++n;
        newBoard[n][x] = turnColor;
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        //setBoard(newBoard);
      }

      color_reverse_break2: while (board[n - 1][x] !== turnColor) {
        if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
          break;
        }
        if (board[n - 1][x] === 0) {
          break;
        }
        while (board[n - 2][x] !== turnColor) {
          if (board[n - 2][x] === 0) {
            break color_reverse_break2;
          }
          --n;
        }
        while (board[n - 1][x] === 3 - turnColor) {
          if (board[n - 1][x] === 0) {
            break color_reverse_break2;
          }
          --n;
          newBoard[n][x] = turnColor;
          console.log('test2');
        }
        /*
        if (board[n + 2][x] !== turnColor) {
          console.log("korroke")
          break;
        }
        */
        --n;
        newBoard[n][x] = turnColor;
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        //setBoard(newBoard);
      }

      color_reverse_break3: while (board[y][m + 1] !== turnColor) {
        if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
          break;
        }
        if (board[y][m + 1] === 0) {
          break;
        }
        while (board[y][m + 2] !== turnColor) {
          if (board[y][m + 2] === 0) {
            break color_reverse_break3;
          }
          ++m;
        }
        while (board[y][m + 1] === 3 - turnColor) {
          if (board[y][m + 1] === 0) {
            break color_reverse_break3;
          }
          ++m;
          newBoard[y][m] = turnColor;
          console.log('test3');
        }
        /*
        if (board[n + 2][x] !== turnColor) {
          console.log("korroke")
          break;
        }
        */
        ++m;
        newBoard[y][m] = turnColor;
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        //setBoard(newBoard);
      }

      color_reverse_break4: while (board[y][m - 1] !== turnColor) {
        if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
          break;
        }
        if (board[y][m - 1] === 0) {
          break;
        }
        while (board[y][m - 2] !== turnColor) {
          if (board[y][m - 2] === 0) {
            break color_reverse_break4;
          }
          --m;
        }
        while (board[y][m - 1] === 3 - turnColor) {
          if (board[y][m - 1] === 0) {
            break color_reverse_break4;
          }
          --m;
          newBoard[y][m] = turnColor;
          console.log('test4');
        }
        /*
        if (board[n + 2][x] !== turnColor) {
          console.log("korroke")
          break;
        }
        */
        --m;
        newBoard[y][m] = turnColor;
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        //setBoard(newBoard);
      }

      color_reverse_break5: while (board[n + 1][m + 1] !== turnColor) {
        if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
          break;
        }
        if (board[n + 1][m + 1] === 0) {
          break;
        }
        while (board[n + 1][m + 2] !== turnColor) {
          if (board[n + 1][m + 2] === 0) {
            break color_reverse_break5;
          }
          ++m;
          ++n;
        }
        while (board[n + 1][m + 1] === 3 - turnColor) {
          if (board[n + 1][m + 1] === 0) {
            break color_reverse_break5;
          }
          ++m;
          ++n;
          newBoard[n][m] = turnColor;
          console.log('test5');
        }
        /*
        if (board[n + 2][x] !== turnColor) {
          console.log("korroke")
          break;
        }
        */
        ++m;
        ++n;
        newBoard[n][m] = turnColor;
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        //setBoard(newBoard);
      }

      color_reverse_break6: while (board[n - 1][m + 1] !== turnColor) {
        if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
          break;
        }
        if (board[n - 1][m + 1] === 0) {
          break;
        }
        while (board[n - 1][m + 2] !== turnColor) {
          if (board[n - 1][m + 2] === 0) {
            break color_reverse_break6;
          }
          ++m;
          --n;
        }
        while (board[n - 1][m + 1] === 3 - turnColor) {
          if (board[n - 1][m + 1] === 0) {
            break color_reverse_break6;
          }
          ++m;
          --n;
          newBoard[n][m] = turnColor;
          console.log('test6');
        }
        /*
        if (board[n + 2][x] !== turnColor) {
          console.log("korroke")
          break;
        }
        */
        ++m;
        --n;
        newBoard[n][m] = turnColor;
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        //setBoard(newBoard);
      }

      color_reverse_break7: while (board[n + 1][m - 1] !== turnColor) {
        if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
          break;
        }
        if (board[n + 1][m - 1] === 0) {
          break
        }
        while (board[n + 1][m - 2] !== turnColor) {
          if (board[n + 1][m - 2] === 0) {
            break color_reverse_break7;
          }
          --m;
          ++n;
        }
        while (board[n + 1][m - 1] === 3 - turnColor) {
          if (board[n + 1][m - 1] === 0) {
            break color_reverse_break7;
          }
          --m;
          ++n;
          newBoard[n][m] = turnColor;
          console.log('test7');
        }
        /*
        if (board[n + 2][x] !== turnColor) {
          console.log("korroke")
          break;
        }
        */
        --m;
        ++n;
        newBoard[n][m] = turnColor;
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        //setBoard(newBoard);
      }

      color_reverse_break8: while (board[n - 1][m - 1] !== turnColor) {
        if (board[y][x] === turnColor || board[y][x] === 3 - turnColor) {
          break;
        }
        if (board[n - 1][m - 1] === 0) {
          break;
        }
        while (board[n - 1][m - 2] !== turnColor) {
          if (board[n - 1][m - 2] === 0) {
            break color_reverse_break8;
          }
          --m;
          --n;
        }
        while (board[n - 1][m - 1] === 3 - turnColor) {
          if (board[n - 1][m - 1] === 0) {
            break color_reverse_break8;
          }
          --m;
          --n;
          newBoard[n][m] = turnColor;
          console.log('test8');
        }
        /*
        if (board[n + 2][x] !== turnColor) {
          console.log("korroke")
          break;
        }
        */
        --m;
        --n;
        newBoard[n][m] = turnColor;
        newBoard[y][x] = turnColor;
        setTurnColor(3 - turnColor);
        //setBoard(newBoard);
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
