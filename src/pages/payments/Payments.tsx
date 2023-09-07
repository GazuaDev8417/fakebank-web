import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import {Container} from './styled'


//+=======================Components==========================
const Payments = ():JSX.Element=>{
	const history = useNavigate()
	const inputSubmit = useRef<HTMLInputElement | null>(null)
	const [form, setForm] = useState({
        cpf:'12345678913',
		password:'123456',
		initialDate:'',
		value:'',
		description:''
	})


	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token === null){
			history('/')
		}

	}, [])


	const onChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	const pay = (e:React.FormEvent<HTMLFormElement>):void=>{
		e.preventDefault()
		const convert = form.initialDate.split('-')
		const date = `${convert[2]}/${convert[1]}/${convert[0]}`

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(form.cpf),
			initialDate: date,
			value: form.value,
			description: form.description
		}

		axios({
			method:'POST',
			url:`${url}/accounts/payment`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: body
		}).then(res=>{
			alert(res.data)
		}).catch(err=>{
			const msg = err.response.data
			if(msg === 'jwt expired'){
				alert(`Token expirado\nPor motivos de segurança você deve efetuar login novamente`)
			}else{
				alert(err.response.data)
			}
		})

	}


	const limpar = ()=>{
        setForm({
            cpf:'',
			password:'',
			initialDate:'',
			value:'',
			description:''
		})
	}
	


//====================================Render=============================
	return<div>
			<Header/>
			 <Container>
				<h3>Pagamentos</h3>
				<form onSubmit={pay}>					
					<input 
						type='text'
						name='cpf'
						value={form.cpf}
						onChange={onChange}
					 	placeholder='CPF(somente números)'
						required/>
					<input 
						type='date'
						name='initialDate'
						value={form.initialDate}
						onChange={onChange}
						required/>
					<input 
						type='text'
						name='description'
						value={form.description}
						onChange={onChange}
					 	placeholder='Descrição'
						required/>
					<input 
						type='text'
						name='value'
						value={form.value}
						onChange={onChange}
						placeholder='Valor R$ 0,00' 
						required/>
					<input 
						type='password'
						name='password'
						value={form.password}
						onChange={onChange}
					 	placeholder='Sua senha'
						required/>
					<input type="submit" style={{display:'none'}} ref={inputSubmit}/>
					<div className='btn-container'>
						<div className='btn' onClick={limpar}>
							Limpar
						</div>
						<div className='btn' onClick={()=> inputSubmit.current?.click()} >Acessar</div>
					</div>
				</form>
			  </Container>
		  </div>
}
export default Payments
