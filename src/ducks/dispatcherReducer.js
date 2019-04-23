import axios from 'axios'

const inState = {
    items: [],
    drivers: [],
    cust: []
}

//action types
const GET_ITEMS = 'GET_ITEMS'
const GET_DRIVERS = 'GET_DRIVERS'
const GET_CUST = 'GET_CUST'
const DELETE_ITEM = 'DELETE_ITEM'
const DELETE_DRIVER = 'DELETE_DRIVER'
const DELETE_CUST = 'DELETE_CUST'
const UPDATE_CUST = 'UPDATE_CUST'

// action Creators

export function getItems() {
   let items = axios.get('/inventory/info')
    .then(res => {
    return res.data
    })
    return {
        type: GET_ITEMS,
        payload: items
    }
}

export function getDrivers() {
    let drivers = axios.get('/user/info')
    .then(res => {
        return res.data
    })
    return {
        type: GET_DRIVERS,
        payload: drivers
    }
}

export function getCust() {
    let cust = axios.get('/cust/info')
    .then(res => {
        return res.data
    })
    return {
        type: GET_CUST,
        payload: cust
    }
}

export function deleteItem(item) {
    let items = axios.delete(`/inventory/info/${item.item_id}`)
    .then(res => {
        return res.data
    })
    return {
        type:DELETE_ITEM,
        payload: items
    }
}

export function deleteDriver(driver) {
    let drivers = axios.delete(`/user/info/${driver.user_id}`)
    .then(res => {
        return res.data
    })
    return {
        type:DELETE_DRIVER,
        payload: drivers
    }
}

export function deleteCust(custId) {
    let cust = axios.delete(`/cust/info/${custId.cust_id}`)
    .then(res => {
        return res.data
    })
    return {
        type: DELETE_CUST,
        payload: cust
    }
}

export function updateCust(custId) {
    console.log(custId, 55)
    let cust = axios.put(`/cust/info/${custId.cust_id}`)
    .then(res => {
        return res.data
    })
    return {
        type: UPDATE_CUST,
        payload: cust
    }
}

// Reducer

export default function reducer(state = inState, action) {
    switch(action.type) {
        //get item data
        case GET_ITEMS + '_PENDING':
        return {...state}
        case GET_ITEMS + '_FULFILLED':
        return {...state, items: action.payload}
        //get drivers data
        case GET_DRIVERS + '_PENDING':
        return {...state}
        case GET_DRIVERS + '_FULFILLED':
        return {...state, drivers: action.payload}
        //get customer data
        case GET_CUST + '_PENDING':
        return {...state}
        case GET_CUST + '_FULFILLED':
        return {...state, cust: action.payload}
        //delete item
        case DELETE_ITEM + '_PENDING':
        return {...state}
        case DELETE_ITEM + '_FULFILLED':
        return {...state, items: action.payload}
        //delete driver
        case DELETE_DRIVER + '_PENDING':
        return {...state}
        case DELETE_DRIVER + '_FULFILLED':
        return {...state, drivers: action.payload}
        //delete Cust
        case DELETE_CUST + '_PENDING':
        return {...state}
        case DELETE_CUST + '_FULFILLED':
        return {...state, cust: action.payload}
        //update Cust
        case UPDATE_CUST + '_PENDING':
        return {...state}
        case UPDATE_CUST + '_FULFILLED':
        return {...state, cust: action.payload}

        default:
        return state
    }
}