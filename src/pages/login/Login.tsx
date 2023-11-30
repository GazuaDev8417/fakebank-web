import React, {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { url } from '../../constants/urls'
import axios from 'axios'
import { Container } from './styled'
import Modal from '../../components/Modal'




const Login = ():JSX.Element=>{
	const history = useNavigate()
	const inputSubmit = useRef<HTMLInputElement | null>(null)
	const [showModal, setShowModal] = useState<boolean>(false)
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

	useEffect(()=>{
        const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        if(isMobileDevice){
            setShowModal(true)
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
		<Container>
			<header>
				<h3>Acesse sua conta</h3>
			</header>
			{ showModal && <Modal setShowModal={setShowModal}/> }
			<main>
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
						<button type='button' className='btn' onClick={limpar}>
							Limpar
						</button>
						<button 
							type='submit'
							className='btn' onClick={()=> inputSubmit.current?.click()} >Acessar</button>						
					</div>
				</form>
			</main>
			<footer>
				<p>Clique <Link to='/signup'>aqui</Link> para abrir uma conta.</p>
			</footer>
		</Container>
	)	
}
export default Login
