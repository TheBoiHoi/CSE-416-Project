import * as React from 'react';
import ItemCard from './ItemCard'
import ItemExchanges from './ItemExchanges'
import {useParams} from 'react-router-dom'
import axios from 'axios'
const ItemProfile =(props)=>{
    
    return(
        <div>
            <div style={{}} class="row align-items-center">
                <br></br>
            </div>
            <div class="row align-items-center">
            <div  align="center" class="col">
                <ItemCard name="testuser"/>
            </div>
            </div>
            <br></br>
            <div class="row align-items-center">
            <div  align="center" class="col">
                <ItemExchanges/>
            </div>
            </div>
        </div>
    )
};
export default ItemProfile