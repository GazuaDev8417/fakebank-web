import React, {useState, useEffect, useRef, useContext} from 'react'
import Context from '../../global/Context'
import axios from 'axios'
import {url} from '../../constants/urls'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { Container } from './styled'



//===================Inicio do componente funcional==========================
const Deposit = ():JSX.Element=>{
	const { states, requests } = useContext(Context)
	const account = states.account
	let cpfValue = account.email === 'visitante@email.com' ? '12345678911' : '12345678912'
	const history = useNavigate()
	const inputSubmit = useRef<HTMLInputElement | null>(null)
	const [form, setForm] = useState({
        cpf:cpfValue,
		password:'123456',
        value:''
	})


	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token === null){
			history('/')
		}

		requests.findById()
	}, [])



	const onChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	const addCash = (e:React.FormEvent<HTMLFormElement>):void=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(form.cpf),
			value: Number(form.value)
		}

		axios({
			method:'POST',
			url:`${url}/accounts/deposit`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: body
		}).then((res)=>{
			alert(res.data)
		}).catch(err=>{
			const msg = err.response.data
			if(msg === 'jwt expired'){
				const decide = window.confirm(`Token expirado\nPor motivos de segurança você deve efetuar login novamente`)
				if(decide){
					localStorage.clear()
					history('/login')
				}
			}else{
				alert(err.response.data)
			}
		})

	}


	const limpar = ()=>{
		setForm({
            cpf:'',
			password:'',
            value:''
		})
	}


//===========================Render================================

	return(
        <div>
			 <Header/>
			 <Container>
				<h3>Depositos</h3>
				<form onSubmit={addCash}>					
					<input 
						type='text' name='cpf' value={form.cpf} onChange={onChange}
					 placeholder='CPF(somente números)' autoFocus required/>
					<input  
						type='text' name='value' value={form.value} onChange={onChange}
					 placeholder='R$ 0,00' required/>
					<input 
						type='password' name='password' value={form.password} onChange={onChange}
					 placeholder='Sua senha' required/>
					<input type="submit" style={{display:'none'}} ref={inputSubmit}/>
					<div className='btn-container'>
						<div className='btn' onClick={limpar}>
							Limpar
						</div>
						<div className='btn' onClick={()=> inputSubmit.current?.click()} >Depositar</div>
					</div>
				</form>
			  </Container>
		  </div>
    )
}
export default Deposit
