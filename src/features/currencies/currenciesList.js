import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import SingleCurrency from './singleCurrency'

import { fetchCurrencies, fetchBaseCurrency } from './currencySlice'

export const CurrenciesList = () => {
    const [base, setBase] = useState('')

    const currencies = useSelector(state => state.currencies.currencies)
    const error = useSelector(state => state.currencies.error)
    const dispatch = useDispatch()
    const currenciesStatus = useSelector(state => state.currencies.status)

    const onBaseChange = e => setBase(e.target.value)
// Делает запрос курса валют если статус = idle
    useEffect(() => {
        if(currenciesStatus === 'idle')
        {
            dispatch(fetchCurrencies())
        }       
    }, [currenciesStatus, dispatch])
// Делает запрос курса валют с выбранной базовой валютой
    const fetchBase = () => {
        dispatch(fetchBaseCurrency(base))
        setBase('')
    }
   
    let content, selectBase   // Для рендера в конце

// В зависимости от статуса показывает разные данные
// Показывает загрузку если данные загружаются
    if (currenciesStatus === 'loading') 
    {
        content = <div>Loading...</div>
    } 
// Показывает список если данные получены
    else if (currenciesStatus === 'succeeded') 
    {   const arrayOfCurrencies = Object.keys(currencies.rates)  
        const changingBase = arrayOfCurrencies.map(currency =>(
            <option key={nanoid()} value={arrayOfCurrencies[currency]}>
                {currency}
            </option>
        ))
        // Выпадающий список с выбором базовой валюты
        selectBase = 
            <div>
                <label htmlFor="changingBase">Base:</label>
                <select id="changingBase" value={base} onChange={onBaseChange}>
                    <option value=''></option>
                    {changingBase}
                </select>
            </div>
        
        const renderedList =  arrayOfCurrencies.map(currency => (
            <li key={nanoid()}>
                <SingleCurrency name={currency} exchangeRate={currencies.rates[currency].toFixed(2)}/>  {/* Округляем значения до двух цифр */}
            </li>
        ))
        content = 
        <div>
            <h3>Base: {currencies.base}</h3>
            <ul>{renderedList}</ul>
        </div>
    } 
// Показывает ошибку если данные не получены
    else if (currenciesStatus === 'failed') 
    {
        content = <div>{error}</div>
    }

    return(
        <div>
            <header>
                {selectBase}
                <button type="button" onClick={fetchBase} disabled={!base} >
                    Change Base
                </button>
            </header>
            <section>
                {content}
            </section>
        </div>
    )
}