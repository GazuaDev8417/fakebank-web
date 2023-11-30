import {useState, useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdArrowBackIosNew } from 'react-icons/md'
import {url} from '../../constants/urls'
import { Container } from './styled'





const Signup = ()=>{
	const history = useNavigate()
	const inputSubmit = useRef<HTMLInputElement | null>(null)
	const [form, setForm] = useState({
		name:'',
		email:'',
		cpf:'',
		initialDate:'',
		password:'',
		confPassword:''
	})	
	
	
	const onChange = (e:React.ChangeEvent<HTMLInputElement>):void=>{
		const {name, value} = e.target
		setForm({...form, [name]: value})
	}


	const signup = (e:React.FormEvent<HTMLFormElement>):void=>{
		e.preventDefault()

		const convert = form.initialDate.split('-')
		const date = `${convert[2]}/${convert[1]}/${convert[0]}`

		const body = {
			name: form.name,
			cpf: Number(form.cpf),
			email: form.email,
			initialDate: date,
			password: form.password,
			passwordConf: form.confPassword
		}
		axios.post(`${url}/accounts/create`, body).then(res=>{
			localStorage.setItem('token', res.data)
			history('/balance')
		}).catch(err=>{
			alert(err.response.data)
		})
	}


	const limpar = ()=>{
		setForm({
			cpf:'',
			name:'',			
			email:'',
			initialDate:'',
			password:'',
			confPassword:''
		})
	}

//=========================Render=======================================
	return(
		<main>
			<MdArrowBackIosNew onClick={()=> history('/login')} 
				style={{fontSize:'2rem', cursor:'pointer', marginBottom:30}}/> 
			<Container>
				<header>
					<h3>Cadastre-se</h3>
				</header>
				<form onSubmit={signup}>
					<input  
						type='text' name='name' value={form.name} onChange={onChange}
						placeholder='Nome de usuário' autoFocus required/>				
					<input 
						type='email' name='email' value={form.email} onChange={onChange}
						placeholder='E-mail' required/>
					<input  name='cpf'
						type='text' value={form.cpf} onChange={onChange}
						placeholder='CPF(somente números)' required/>
					<input 
						type='date' name='initialDate' value={form.initialDate} onChange={onChange}
						required/>
					<input 
						type='password' name='password' value={form.password} onChange={onChange}
						placeholder='Senha' required/>
					<input 
						type='password' name='confPassword' value={form.confPassword} onChange={onChange}
						placeholder='Confirme sua senha'/>
					<input type="submit" style={{display:'none'}} ref={inputSubmit}/>
					<div className='btn-container'>
						<div className='btn' onClick={limpar}>
							Limpar
						</div>
						<div className='btn' onClick={()=> inputSubmit.current?.click()} >Registrar</div>
					</div>
				</form>
			</Container>
		</main>
	)
		
}
export default Signup
