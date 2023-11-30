import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


//+======================Style======================
const Container = styled.div`
	text-align: center;

	header{
		margin: 10vh 0;
	}

	.access-btn{
		background-color: transparent;
		border-radius: 10px;
		border: none;
		font-size: 1rem;
		box-shadow: 3px 3px 6px;
		padding: 10px 0;
		color: lightgray;
		cursor: pointer;
		transition: .5s;
		width: 25vw;
	}
	
	.access-btn:hover{
		transform: scale(1.05);
		background: rgba(0, 0, 50, .8);
	}

	@media(max-width: 800px){
		h1{
			font-size: 1.5rem;
		}
	}
`



//===============================Component==========================
const Home = ()=>{
	const history = useNavigate()


	useEffect(()=>{
		const token = localStorage.getItem('token')

		if(token){
			history('/balance')
		}

	}, [])

	return(
		<Container>
			<header>
				<h1>Bem vindos ao Fakebank</h1>
			</header>
			<main>
				<button className='access-btn' 
					onClick={()=> history('/login')}>Acessar</button>
			</main>
		</Container>
	)
}
export default Home
