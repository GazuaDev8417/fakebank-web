import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


//+======================Style======================
const Container = styled.div`
	h1{
		text-align: center;
		margin-bottom: 20vh;
	}

	.access-btn{
		background-color: transparent;
		text-align: center;
		border-radius: 10px;
		box-shadow: 3px 3px 6px;
		width: 20vw;
		padding: 10px;
		margin: auto;
		margin-bottom: 80vh;
		color: lightgray;
		cursor: pointer;
		transition: .5s;
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

	return<Container>
			<h1>Bem vindos ao Fakebank</h1>
			<div className='access-btn' 
				onClick={()=> history('/login')}>Acessar</div>
		  </Container>
}
export default Home
