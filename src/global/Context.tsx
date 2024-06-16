import React, { createContext, useState } from 'react'
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
    states:{ accounts:Accounts[], account:Accounts }
    setters: {}
    requests: { getAccounts: ()=>void, findById: ()=>void }
}

const defaultAccount:Accounts = {
	id:'',
	name:'',
	cpf:'',
	birth_date:new Date(),
	balance:0,
	email:'',
	password:''
}

const defaultContextValue:GlobalStateContext = {
	states: { accounts:[], account:defaultAccount },
	setters: {},
	requests: { getAccounts: ()=>{}, findById: ()=>{} }
}

const Context = createContext<GlobalStateContext>(defaultContextValue)



export const GlobalState = (props:GlobalStateProps)=>{
    const [accounts, setAccounts] = useState<Accounts[]>([])
	const [account, setAccount] = useState<Accounts>({
		id:'',
		name:'',
		cpf:'',
		birth_date:new Date(),
		balance:0,
		email:'',
		password:''
	})

	const getAccounts = ()=>{
		axios.get<Accounts[]>(`${url}/accounts`).then(res=>{
			setAccounts(res.data)
		}).catch(err=>{
			console.log(err.response)
		})
	}


	const findById = ()=>{
		const token = localStorage.getItem('token')
		const headers = {
			headers: { Authorization: token }
		}
		axios.get(`${url}/accounts/client`, headers).then(res=>{
			setAccount(res.data)
		}).catch(e => alert(e.response.data))
	}


	const states = {accounts, account}
	const setters = {}
	const requests = {getAccounts, findById}



	return<Context.Provider value={{states, setters, requests}}>
			{props.children}
		  </Context.Provider>

}

export default Context