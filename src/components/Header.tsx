import { useNavigate } from 'react-router-dom'
import { AiOutlineHome, AiOutlineLogout } from 'react-icons/ai'
import { useState } from 'react'
import { Container } from './headerStyled'






const Header = ():JSX.Element=>{
	const history = useNavigate()
	const [selectedOption, setSelectedOption] = useState<string | undefined>()


	const handleSelect = (event:React.ChangeEvent<HTMLSelectElement>):void=>{
		const newOption = event.target.value

		if(newOption !== ''){
			history(`/${newOption}`)
		}

		setSelectedOption(newOption)
	}


	const logout = ():void=>{
		const confirm = window.confirm('Tem certeza que quer sair da sua conta?')

		if(confirm){
			localStorage.clear()
			history('/login')
		}

	}


	return<Container>
			<AiOutlineHome className='home-icon'
				onClick={()=> history('/fakebank-web')} />
			<div id='btn-container'>
				<div className='btn-header' onClick={()=> history('/balance')}>Saldo</div>
				<div className='btn-header' onClick={()=> history('/statement')}>Extrato</div>
				<div className='btn-header' onClick={()=> history('/pay')}>Pagamentos</div>
				<div className='btn-header' onClick={()=> history('/transfer')}>Transferências</div>
				<div className='btn-header' onClick={()=> history('/deposit')}>Deposito</div>
			</div>
			<div id='select'>
				<select className='form-select select' value={selectedOption} onChange={handleSelect}>
					<option value='balance'>Saldo</option>
					<option value='statement'>Extrato</option>
					<option value='pay'>Pagamentos</option>
					<option value='deposit'>Deposito</option>
					<option value='transfer'>Transferências</option>
				</select>
			</div>
			<AiOutlineLogout className='logout-icon'
				onClick={logout}/>
		  </Container>
}
export default Header
