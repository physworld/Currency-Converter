import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import { NavBar } from './navbar'
import { CurrenciesList } from './features/currencies/currenciesList'
import { Converter } from './features/converter/converter'

function App(){
    return(
        <Router>
        <NavBar/>
            <Switch>
                <Route 
                exact
                path='/'
                render={() => (
                    <div>
                        <h1>Сurrencies</h1>
                        <CurrenciesList/>
                    </div>
                )}
                />
                <Route 
                exact 
                path='/converter' 
                render = {() => (
                    <div>
                        <Converter/>
                    </div>
                )}/>
                <Redirect to='/'/>
            </Switch>
        </Router>
        )
}

export default App