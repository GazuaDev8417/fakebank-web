import {useState, useEffect, useRef, useContext} from 'react'
import Context from '../../global/Context.tsx'
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
	const { states, requests } = useContext(Context)
	const account = states.account
	let cpfValue = account.email === 'visitante@email.com' ? '12345678911' : '12345678912'
	const history = useNavigate()
	const inputSubmit = useRef<HTMLInputElement | null>(null)
	const divRef = useRef<HTMLDivElement>(null)
	const [transaction, setTransaction] = useState<Transaction[]>([])
	const [form, setForm] = useState({
        cpf:cpfValue,
		password:'123456',
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
			if(res.data.length === 0 && divRef.current){
				divRef.current.textContent = ''
				const text = document.createTextNode('Sem movimentações na conta até a presente data')
				divRef.current.appendChild(text)
			}else{
				setTransaction(res.data)
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
						<div className='btn' onClick={()=> inputSubmit.current?.click()} >Consultar</div>
					</div>
					{transaction.length > 0 ? (
						<>
							<div style={{width:'100%', display:'flex', alignItems:'center', flexDirection:'column', gap:10, marginBottom:30, fontSize:'1.5rem'}}>
								Extrato:
								<div style={{border:'1px solid', width:'90%'}}/>
							</div>
							{transaction && transaction.map(state=>{
								return <Card key={state.id}>
										<b>Valor: </b>{state.value}<br/>
										<b>Data: </b>{convertDate(state.date)}<br/>
										<b>Descrição: </b>{state.description}<hr/>
									</Card>
							})}
						</>
					) : <div ref={divRef}></div>}
					{/* {transaction.length > 0 ? (
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
					})} */}
				</form>
			</Container>
		  </div>
}
export default Statement
