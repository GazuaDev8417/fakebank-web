import {useState, useEffect, useRef} from 'react'
import Header from '../../components/Header'
import { useNavigate } from 'react-router-dom'
import { url } from '../../constants/urls'
import axios from 'axios'
import { convertDate } from '../../utils/convertDate'
import {Container, Card} from './styled.tsx'


interface Transaction{
    id:string
    value:number
    date:Date
    description:string
    client_id:string
}


//==========================Component=======================
const Statement = ()=>{
	const history = useNavigate()
	const inputSubmit = useRef<HTMLInputElement | null>(null)
	const [transaction, setTransaction] = useState<Transaction[]>([])
	const [form, setForm] = useState({
        cpf:'12345678913',
		password:'123456',
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


	const statement = (e:React.FormEvent<HTMLFormElement>):void=>{
		e.preventDefault()

		const body = {
			token: localStorage.getItem('token'),
			cpf: Number(form.cpf),
			password: form.password
		}

		axios({
			method:'POST',
			url:`${url}/accounts/statement`,
			headers: {
				Authorization: localStorage.getItem('token')
			},
			data: body
		}).then(res=>{
			setTransaction(res.data)
		}).catch(err=>{
			const msg = err.response.data.message
			if(msg === 'jwt expired'){
				alert(`Token expirado\nPor motivos de segurança você deve efetuar login novamente`)
			}else{
				alert(err.response.data.message)
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
	return<div>
			<Header/>
			<Container className='content'>
					<h3>Extrato</h3>
				<form onSubmit={statement}>				
					<input 
						name='cpf'
						value={form.cpf}
						onChange={onChange}
						placeholder='CPF(somente números)'
						required/>
					<input 
						name='password'
						value={form.password}
						onChange={onChange}
						type='password'
						placeholder='Sua senha'
						autoFocus
						required />
					<input type="submit" style={{display:'none'}} ref={inputSubmit}/>
					<div className='btn-container'>
						<div className='btn' onClick={limpar}>
							Limpar
						</div>
						<div className='btn' onClick={()=> inputSubmit.current?.click()} >Acessar</div>
					</div>
					{transaction.length > 0 ? (
						<div style={{margin:'30px', width:'100%', textAlign:'center',fontSize:'1.5rem'}}>
							Resultado
							<div style={{border:'1px solid', width:'100%'}}/>
						</div>
					) : null}
					{transaction && transaction.map(state=>{
						return <Card key={state.id}>
								<b>Valor: </b>{state.value}<br/>
								<b>Data: </b>{convertDate(state.date)}<br/>
								<b>Descrição: </b>{state.description}<hr/>
							   </Card>
					})}
				</form>
			</Container>
		  </div>
}
export default Statement
