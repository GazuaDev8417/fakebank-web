import React, {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { url } from '../../constants/urls'
import axios from 'axios'
import { Container, FootDiv } from './styled'




const Login = ():JSX.Element=>{
	const history = useNavigate()
	const inputSubmit = useRef<HTMLInputElement | null>(null)
	const [form, setForm] = useState({
		email:'visitante@email.com',
		password:'123456'
	})


	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token){
			history('/balance')
		}

	}, [])


	const onChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}



	const register = (e:React.FormEvent<HTMLFormElement>):void=>{
		e.preventDefault()

		const body = {
			email: form.email,
			password: form.password
		}
		axios.post(`${url}/accounts/login`, body).then(res=>{
			localStorage.setItem('token', res.data)
			history('/balance')
		}).catch(err=>{
			alert(err.response.data)
		})

	}


	const limpar = ()=>{
		setForm({
			email:'',
			password:''
		})
	}


//=========================Render=======================================
	return(
		<div style={{marginTop:'10%'}}>
			<Container>
				<h3 style={{textAlign:'center'}}>Acesse sua conta</h3>
				<form onSubmit={register}>
				<input  
					type='email'
					name='email'
					value={form.email}
					onChange={onChange}
					placeholder='nome@email.com'
					required
					autoFocus/>
				<input  
					type='password'
					name='password'
					value={form.password}
					onChange={onChange}
					placeholder='Senha'
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
			<FootDiv>Clique <Link to='/signup'>aqui</Link> para abrir uma conta.</FootDiv>
		</div>
	)	
}
export default Login
