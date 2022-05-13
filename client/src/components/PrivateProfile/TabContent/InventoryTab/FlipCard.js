import ReactCardFlip from 'react-card-flip';
import * as React from 'react'
import {InventoryCard} from '../InventoryCard'
import {useState, useEffect} from 'react'
import axios from 'axios'
const FlipCard = (props)=>{
  const [isFlipped, toggleIsFlipped]=useState(false)
  const [item, setItem]=useState(false)
  useEffect(()=>{
    axios.get(`/item/get/${props.item}`).then(response=>{
          let item=response.data.item
          setItem(item)
      })
  },[])
    
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
            <div style={{width:'200px'}} onClick={handleClick}>
                <InventoryCard  item={item} front={true}/>
            </div>   
            <div style={{width:'200px'}}  onClick={handleClick}>
                <InventoryCard curr_user={props.curr_user} user={props.user} item={item} public={props.public} front={false}/>
            </div>
        </ReactCardFlip>
      </div>
    )
    //}
  }

export default FlipCard