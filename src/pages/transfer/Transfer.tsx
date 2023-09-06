import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import {Container} from './styled'


//===========================Inicio do compoente funcional=========
const Transfer = ()=>{
	const history = useNavigate()
	const inputSubmit = useRef<HTMLInputElement | null>(null)
	const [form, setForm] = useState({
        cpf:'12345678913',
        recipientCpf: '12345678911',
        value:'',
		password:'123456',
		recipientName:'Visitante2'
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


	const transfer = (e:React.FormEvent<HTMLFormElement>):void=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			password: form.password,
			cpf: Number(form.cpf),
			recipientName: form.recipientName,
			recipientCpf: Number(form.recipientCpf),
			value: Number(form.value)
		}

		axios({
			method:'POST',
			url:`${url}/accounts/transfer`,
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
			recipientName:'',
            recipientCpf:'',
            value:'',
			password:''
		})
	}


//=============================Render============================
	return<div>
			<Header/>
			 <Container>
				<h3>Transferências</h3>
				<form onSubmit={transfer}>					
					<input className='form-control'
						type='text' name='cpf' value={form.cpf}
					 onChange={onChange} placeholder='CPF(somente números)' autoFocus required/>
					<input className='form-control'
						type='text' name='recipientName' value={form.recipientName}
					 onChange={onChange} placeholder='Nome do destinatário' required/>
					<input className='form-control'
						type='text' name='recipientCpf' value={form.recipientCpf}
					 onChange={onChange} placeholder='CPF do destinatário' required/>
					<input className='form-control' 
						type='text' name='value' value={form.value} onChange={onChange}
					 placeholder='Valor R$ 0,00'required/>
					<input className='form-control'
						type='password' name='password' value={form.password} onChange={onChange}
					 placeholder='Sua senha' required/>
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
export default Transfer
