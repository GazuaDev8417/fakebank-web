import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../constants/urls'




interface Accounts{
    id:string
    name:string
    cpf:string
    birth_date:Date
    balance:number
    email:string
    password:string
}

interface GlobalStateProps{
    children:React.ReactNode
}

interface GlobalStateContext{
    states:{ accounts:Accounts[] }
    setters: {}
    requests: { getAccounts: ()=>void }
}

const Context = createContext<GlobalStateContext | null>(null)



export const GlobalState = (props:GlobalStateProps)=>{
    const [accounts, setAccounts] = useState<Accounts[]>([])


	useEffect(()=>{
		getAccounts()
	}, [])

	const getAccounts = ()=>{
		axios.get<Accounts[]>(`${url}/accounts`).then(res=>{
			setAccounts(res.data)
		}).catch(err=>{
			console.log(err.response)
		})
	}


	const states = {accounts}
	const setters = {}
	const requests = {getAccounts}



	return<Context.Provider value={{states, setters, requests}}>
			{props.children}
		  </Context.Provider>

}

export default Context