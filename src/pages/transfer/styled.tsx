import styled from 'styled-components'


export const Container = styled.div`
	margin: auto;
	padding: 10px;
	width: 40vw;
	border-radius: 10px;
	box-shadow: 3px 3px 7px;

	h3{
		text-align: center;
	}

	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin: 10px;
	}

	input{
        width: 60%;
        height: 30px;
        border-radius: 10px;
        padding-left: 15px;
        font-size: 1rem;
        color: whitesmoke;
        background: transparent;
        border: 1px solid;
        outline: none;
    } 

    .btn-container{
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 63%;		
    }

    .btn{
        border: 1px solid;
        border-radius: 5px;
        padding: 5px 25px;
        color: whitesmoke;
        transition: .5s;

        &:hover{
            cursor: pointer;
            background: rgba(0, 0, 50, .8);
            box-shadow: 1px 1px 2px;
        }

        &:active{
            transform: scale(.9);
        }

        @media(max-width: 800px){
            width: 10%;
            display: flex;
            justify-content: center;
        } 
    }

    @media(max-width: 968px){
        width: 60%;
    }

`