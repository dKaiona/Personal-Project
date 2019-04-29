import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from '../components/Home/home';
import Driver from './../components/DriverView/driverView'
import Dispatcher from '../components/Dispatcher/dispatcher';
import Order from '../components/Create-Order/createOrder';
import Inventory from '../components/Add-Inventory/addInventory';
import AddUser from '../components/Add-User/addUser'


export default(
    <Switch>
        <Route exact path = '/' component={Home}/>
        <Route path = '/driver' component={Driver}/>
        <Route path='/dispatcher' component={Dispatcher}/>
        <Route path='/order' component={Order}/>
        <Route path='/inventory' component={Inventory}/>
        <Route path='/addUser' component={AddUser}/>
    </Switch>
)