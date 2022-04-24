import ReactCardFlip from 'react-card-flip';
import * as React from 'react'
import {InventoryCard} from '../InventoryCard'
import {useState} from 'react'
const FlipCard = (props)=>{
  const [isFlipped, toggleIsFlipped]=useState(false)
    constructor() {
      super();
        this.state = {
        isFlipped: false
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick(e) {
      e.preventDefault();
      //console.log('hello')
      toggleIsFlipped(!isFlipped)
      //this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
  
    render() {
      return (
        <div>
          <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical"> 
              <div  onClick={this.handleClick}> 
                  <InventoryCard  front={true}/>
              </div>   
              <div  onClick={this.handleClick}>
                  <InventoryCard public={this.props.public} front={false}/>
              </div>
          </ReactCardFlip>
        </div>
      )
    }
  }

export default FlipCard