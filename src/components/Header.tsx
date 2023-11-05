import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineHome, AiOutlineLogout } from 'react-icons/ai'
import { IoMenu, IoCloseSharp } from 'react-icons/io5'
import { Container } from './headerStyled'






const Header = ():JSX.Element=>{
	const history = useNavigate()
	const [isToggled, setIsToggled] = useState<boolean>(false)


	const toggleClass = ()=>{
		setIsToggled(!isToggled)
	}


	const logout = ():void=>{
		const confirm = window.confirm('Tem certeza que quer sair da sua conta?')

		if(confirm){
			localStorage.clear()
			history('/login')
		}

	}


	return(
		<Container>
			<AiOutlineHome className='header-icon'
				onClick={()=> history('/fakebank-web')} />
			<div className={`btn-container ${isToggled ? 'active' : ''}`}>
				<div className='btn-header-container'>
					<div className='btn-header' onClick={()=> history('/balance')}>Saldo</div>
					<div className='btn-header' onClick={()=> history('/statement')}>Extrato</div>
					<div className='btn-header' onClick={()=> history('/pay')}>Pagamentos</div>
					<div className='btn-header' onClick={()=> history('/transfer')}>Transferências</div>
					<div className='btn-header' onClick={()=> history('/deposit')}>Deposito</div>
				</div>
			</div>
			{
				!isToggled ? <IoMenu className='header-icon menu' onClick={toggleClass} />
				: <IoCloseSharp className='header-icon menu' onClick={toggleClass} />
			}
			<AiOutlineLogout className='header-icon' onClick={logout}/>
		</Container>
	)
}
export default Header
