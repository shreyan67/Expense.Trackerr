import React, {useReducer, createContext, Children, useState} from 'react';


import contextReducer from './contextReducer'
import transitions from '@material-ui/core/styles/transitions';
const initialState =JSON.parse(localStorage.getItem('transactions'))|| [{"amount":400,"category":"Food","type":"Expense","date":"2024-07-27","id":"b2278714-a2c1-4ff1-bf41-8f4e549351b1"},{"amount":1100,"category":"Car","type":"Expense","date":"2024-07-27","id":"86f870d3-73ef-45bf-b78a-165ef5c2b2dd"},{"amount":1000,"category":"Gifts","type":"Income","date":"2024-07-27","id":"0f11e51e-2136-429f-9c50-86f70dbc6af4"},{"amount":100,"category":"Investments","type":"Income","date":"2024-07-27","id":"7dbc59ae-d6b4-4eba-b715-10b3b2e95870"}]
export const ExpenseTrackerContext= createContext(initialState);

export const Provider=({children})=>{
    const[transactions,dispatch]=useReducer(contextReducer,initialState);
    const deleteTransaction=(id)=>dispatch({type:'DELETE_TRANSACTION',payload:id});
    const addTransaction=(transaction)=>dispatch({type:'ADD_TRANSACTION',payload:transaction});
    const balance=transactions.reduce((acc,currVal)=>{
        return(currVal.type==='Expense'?acc-currVal.amount:acc+currVal.amount)
    },0);
    
            return(
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
                {children}
        </ExpenseTrackerContext.Provider>
    )
}