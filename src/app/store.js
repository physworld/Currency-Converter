import { configureStore } from '@reduxjs/toolkit';
import  currencyReducer  from '../features/currencies/currencySlice'

export default configureStore({
  reducer: {
      currencies: currencyReducer
  },
});
