import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageAvatars from './Avatars.js'
import faces from './faces.json';

class App extends Component {

    drawBoxes(img) {
	// var img = document.getElementById("kids");
	var c = document.getElementById("canvas");
	c.style.position = "absolute";
	c.style.left = img.offsetLeft;
	c.style.top = img.offsetTop;
	c.style.width = img.width;
	c.style.height = img.height;
	var ctx = c.getContext("2d");
	ctx.strokeStyle="#FF0000";
	ctx.lineWidth = 3;
	faces.forEach( face => {
	    console.log( "Drawing a face" );
	    face.faceAnnotations.forEach( (annotations) => {
		console.log( "Drawing an annotation" );
		ctx.beginPath();
		annotations.boundingPoly.vertices.forEach( (vertex,index) => {
		    if( index == 0 ) {
			console.log( "Moving to: ", vertex.x, vertex.y );
			ctx.moveTo( vertex.x, vertex.y );
		    }
		    else {
			console.log( "Vertex: ", vertex.x, vertex.y );
			ctx.lineTo(vertex.x, vertex.y);
		    }
		});
		ctx.stroke();
	    });
	});
	// ctx.arc(100, 75, 10, 0, Math.PI * 2, true);
	ctx.strokeRect(20,20,150,100);
	// ctx.stroke();
    }

    getBoundingPoly(face) {
	return face.faceAnnotations[0].boundingPoly.vertices[0].y;
    }
    
  render() {
    return (
	    <div className="App">
            <img style={{ position: 'absolute', top: 0, left: 0 }} height="600" width="800" src="/kids.png" alt="logo" id="kids" ref={ (ref) => this.drawBoxes(ref) } />
	    <canvas id="canvas"/>
	    <ImageAvatars/>

	{ faces.map( face => {
	    return ( <div key={face}>
		     { this.getBoundingPoly(face) }
		     </div> );
	})
	}
	
      </div>
    );
  }
}

export default App;
