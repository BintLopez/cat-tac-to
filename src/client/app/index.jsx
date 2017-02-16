import React from 'react';
import {render} from 'react-dom';
import Likes from './Likes.jsx';
import Game from './Game.jsx';

var flyingSpaceCats = [
	"https://s-media-cache-ak0.pinimg.com/736x/3c/98/7b/3c987b4a025aade603fdc3352947ee6e.jpg", // on pb&j
	"https://pbs.twimg.com/media/Cz2-hDjWQAAzIBc.jpg", // on cupcake
	"https://s-media-cache-ak0.pinimg.com/originals/d1/08/12/d108125ccb8e6b9c801d290459a2059d.jpg", //storm troopers
]

class App extends React.Component {
  render () {
    return (
    	<div>
    		<Likes />
    		<Game />
    		<img src="https://s-media-cache-ak0.pinimg.com/originals/d1/08/12/d108125ccb8e6b9c801d290459a2059d.jpg" />
    	</div>
    );
  }
}

render(<App/>, document.getElementById('app'));
