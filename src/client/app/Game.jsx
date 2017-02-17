import React from 'react';
import Board from './Board.jsx';

class Game extends React.Component {
  constructor() {
    super();
    var squares = [];
    for (var i = 1; i <= 9; i++) {
       squares.push({i});
    }
    this.state = {
      history: [{
        squares: squares
      }],
      xIsNext: true,
      stepNumber: 0,
      xCharacter: 'cat',
      xOpponent: 'taco'
    };
  }

  handleClick(i) {
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i].character) {
      return;
    }

    squares[i].character = this.state.xIsNext ? this.state.xOpponent : this.state.xCharacter;
    squares[i].imgUrl = this.pickImage(squares[i].character);

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  pickImage(character) {
    const charactersMap = {
      cat: [
        "https://s-media-cache-ak0.pinimg.com/736x/3c/98/7b/3c987b4a025aade603fdc3352947ee6e.jpg", // on pb&j
        "https://pbs.twimg.com/media/Cz2-hDjWQAAzIBc.jpg", // on cupcake
        "https://s-media-cache-ak0.pinimg.com/originals/d1/08/12/d108125ccb8e6b9c801d290459a2059d.jpg", //storm troopers
        "http://i.imgur.com/zGTjZ.jpg", // flying tubcat
        "http://www.bailiwickexpress.com/files/cache/75794cf50467d39608dd181e2b4c010e_f337648.jpg" // flying kitten
      ],
      taco: [
        "http://img02.deviantart.net/7812/i/2010/070/9/1/crazy_taco_by_thequeencrusnik.jpg",
        "https://thetacotrail.files.wordpress.com/2013/10/photo3.jpg",
        "http://notsoaveragemama.com/wp-content/uploads/2015/01/turkey-tacos.png",
        "https://static01.nyt.com/images/2015/07/06/dining/06TACOS/06TACOS-superJumbo.jpg"
      ]
    };
    const possiblePics = eval(`charactersMap.${character}`)
    return shuffleArray(possiblePics).pop();
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? this.state.xOpponent : this.state.xCharacter);
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a].character && squares[a].character === squares[b].character && squares[a].character === squares[c].character) {
      return squares[a].character;
    }
  }
  return null;
}

export default Game;
