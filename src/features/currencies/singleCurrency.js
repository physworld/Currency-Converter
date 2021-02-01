import React, { useState } from 'react'

export default function SingleCurrency({name, exchangeRate})
{
    const [isChosen, setIsChosen] = useState(false)

    const onChangeIsChosen = e => isChosen === false ? setIsChosen(true) : setIsChosen(false)
    return(
        <div>
            {name}: {exchangeRate} 
            <button type="button" onClick={onChangeIsChosen}>{isChosen ? 'True' : 'False'}</button>
        </div>
    )
}