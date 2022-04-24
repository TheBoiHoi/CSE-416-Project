import ReactCardFlip from 'react-card-flip';
import * as React from 'react'
import {InventoryCard} from '../InventoryCard'
import {useState} from 'react'
const FlipCard = (props)=>{
  const [isFlipped, toggleIsFlipped]=useState(false)
    // constructor() {
    //   super();
    //     this.state = {
    //     isFlipped: false
    //   };
    //   this.handleClick = this.handleClick.bind(this);
    // }
    
    
    const handleClick=(e)=>{
      e.preventDefault();
      console.log("printing item id")
      console.log(props.item)
      //this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
      toggleIsFlipped(!isFlipped)
    }
  
    //render() {
    return (
      <div>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical"> 
            <div  onClick={handleClick}> 
                {props.item}
                <InventoryCard  front={true}/>
            </div>   
            <div  onClick={handleClick}>
                <InventoryCard public={props.public} front={false}/>
            </div>
        </ReactCardFlip>
      </div>
    )
    //}
  }

export default FlipCard