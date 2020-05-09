import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Views from '../views/_export'

const Default = ()=> {
    return <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <span style={{fontSize: 31, color: '#cdcdcd'}} > 404 Not found </span>
    </div>
}

function AppNavigator (){
    return (
        <Router>
            <Switch>
                {Views.map((views,index) =>{
                    return (
                        <Route exact path={`/${views.patch}`} component={views.component} key={index}></Route>
                    )
                })}

                <Route component={Default}/>
            </Switch>
        </Router>
    )
}


export default AppNavigator