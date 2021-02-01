import { nanoid } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useSelector } from 'react-redux' 

export const Converter = () => {

const [base, setBase] = useState('')
const [finalCurrency, setFinalCurrency] = useState('')
const [answer, setAnswer] = useState(0)
const [numberOfBase, setNumberOfBase] = useState('')
// Получаем все валюты
const allCurrencies = useSelector(state => state.currencies.currencies)
// Выводим ошибку если валюты не дошли
if(!allCurrencies.rates){
        return (
          <section>
            <h2>Page not found!</h2>
          </section>
        )
}
const onBaseChange = e => setBase(e.target.value)
const onFinalCurrencyChange = e => setFinalCurrency(e.target.value)
const onNumberOfBaseChange =  e => {
        setNumberOfBase(Number(e.target.value))
}
// Условия при которых можно будет конвертировать валюту
let isNotClickable = (base === '') || (finalCurrency === '') || ((base === 'EUR') && (finalCurrency === 'EUR'))
// Получаем данные по двум выбраным валютам и считаем результат
const executeResult = async () => {
    let response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${finalCurrency}`)
    response = await response.json()
    response = response.rates[finalCurrency]
    const result = numberOfBase * response
    setAnswer(result)
}


// Рендерим поля с выпадающим списком и кнопку
const arrayOfCurrencies = Object.keys(allCurrencies.rates)
// В списке может не быть евро, если его нет добавляем его
if(arrayOfCurrencies.indexOf('EUR') === -1){
    arrayOfCurrencies.push('EUR')
}
const changingBase = arrayOfCurrencies.map(currency => (
    <option key={nanoid()} value={arrayOfCurrencies[currency]}>
        {currency}
    </option>
))
const inputs = 
    <div>
        <label htmlFor="numberOfBase">Number of base currency:</label>
        <input type="text" id="numberOfBase" onChange={onNumberOfBaseChange}/>

        <label htmlFor="baseCurrency">Base:</label>
        <select id="baseCurrency" value={base} onChange={onBaseChange}>
            <option value=''></option>
            {changingBase}
        </select>
        <label htmlFor="finalBase">Final Currency:</label>
        <select id="finalBase" value={finalCurrency} onChange={onFinalCurrencyChange}>
            <option value=''></option>
            {changingBase}
        </select>
    </div>
return (
    <div>
        <h1>THIS IS CONVERTER</h1>
        {inputs}
        <button type="buttton" disabled={isNotClickable} onClick={executeResult}>
            Convert
        </button>
        <p>{(answer === 0 || isNaN(answer)) ? 'Enter information and click "Convert"' : answer.toFixed(2)}</p>
    </div>)
}