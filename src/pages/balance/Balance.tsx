import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {url} from '../../constants/urls'
import Header from '../../components/Header.tsx'
import { useNavigate } from 'react-router-dom'
import { Container } from './styled'




//==========================Component=======================
const Balance = ():JSX.Element=>{
    const result = useRef<HTMLParagraphElement | null>(null)
	const inputSubmit = useRef<HTMLInputElement | null>(null)
	const history = useNavigate()
	const [form, setForm] = useState({
        cpf:'12345678911',
		password:'123456'
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


	const getBalance = (e:React.FormEvent<HTMLFormElement>):void=>{
		e.preventDefault()

		const body = {
			password: form.password,
			cpf: Number(form.cpf)
		}

		axios({
			method:'POST',
			url:`${url}/accounts/balance`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: body
		}).then(res=>{
            if(result.current){
                result.current.textContent = `R$ ${res.data.toFixed(2)}`
            }
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
			password:''
		})
	}
	

//===============================Renderizaão===========================
	return(
		<div>
		  <Header/>
		  <Container className='content'>
			<h3>Consulta de saldo</h3>
			<form onSubmit={getBalance}>				
				<input  
					name='cpf'
					value={form.cpf}
					onChange={onChange}
				 	type='text'
					placeholder='CPF(somente números)'
					required/>
				<input  
					name='password' value={form.password} onChange={onChange}
				 	type='password' placeholder='Sua senha' autoFocus required/>
				<input type="submit" style={{display:'none'}} ref={inputSubmit}/>
				<div className='btn-container'>
					<div className='btn' onClick={limpar}>
						Limpar
					</div>
					<div className='btn' onClick={()=> inputSubmit.current?.click()} >Consultar</div>
				</div>
				<p ref={result}></p>
			</form>
		   </Container>		   
		  </div>
	)
}
export default Balance
