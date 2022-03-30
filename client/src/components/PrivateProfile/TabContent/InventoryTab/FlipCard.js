import ReactCardFlip from 'react-card-flip';
import * as React from 'react'
import {InventoryCard} from '../InventoryCard'
export class FlipCard extends React.Component {
    constructor() {
      super();
        this.state = {
        isFlipped: false
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      console.log('hello')
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
  
    render() {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical"> 
            <div style={{background:'red',width:'18rem'}} onClick={this.handleClick}> 
                <InventoryCard  front={true}/>
            </div>   
            <div style={{background:'red',width:'18rem'}} onClick={this.handleClick}>
                <InventoryCard front={false}/>
            </div>
        </ReactCardFlip>
      )
    }
  }