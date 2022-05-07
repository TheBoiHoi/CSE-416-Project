import * as React from 'react';
import ItemCard from './ItemCard'
import ItemExchanges from './ItemExchanges'
const ItemProfile =(props)=>{
    return(
        <div>
            <div style={{}} class="row align-items-center">
                <br></br>
            </div>
            <div class="row align-items-center">
            <div  align="center" class="col">
                <ItemCard/>
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