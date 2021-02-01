import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    currencies: {},
    error: null,
    status: 'idle'
}
 // Происходит запрос курса валют
export const fetchCurrencies = createAsyncThunk('currecies/fetchCurrencies', async () => {
    const response = await fetch('https://api.exchangeratesapi.io/latest')
    return response.json()
})
 // Происходит запрос курса с выбраной базовой валютой
export const fetchBaseCurrency = createAsyncThunk('currencies/fetchBaseCurrency', async base => {
    const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
    return response.json()
})

const currencySlice = createSlice({
    name: 'currencies',
    initialState,
    reduceds: {},
    // Изменяется состояние после запроса на сервер
    extraReducers: {
        [fetchCurrencies.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchCurrencies.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.currencies = action.payload
        },
        [fetchCurrencies.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [fetchBaseCurrency.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchBaseCurrency.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.currencies = action.payload
        },
        [fetchBaseCurrency.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export default currencySlice.reducer