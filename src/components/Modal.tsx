import { Dispatch, SetStateAction } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"



export const Container = styled.div`
    position: absolute;
    top: 20%;
    border: 1px solid;
    border-radius: 10px;
    background-color: rgba(0, 0, 250, 1);
    width: 35vw;
    height: 20vh;
    display: flex;
    justify-content: center;
    color: #fff;
    padding: 20px 10px;
    z-index: 2;

    .content{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .btn-container{
        display: flex;
        align-self: flex-end;
        gap: 20px;
        margin-top: 10px;
    }

    .close-btn{
        width: 7vw;
        height: 25px;
        box-shadow: none;
    }
    
    .ok-btn{
        width: 5vw;
        height: 25px;        
        box-shadow: none;
    }

    .link{
        color: goldenrod;
    }

/* MEDIA QUERY */
    @media(max-width: 450px){
        width: 70%;
        height: 15vh;
    }

    .close-btn{
        width: 20vw;
    }
    
    .ok-btn{
        width: 15vw;
    }
`

interface ModalProps{
    setShowModal:Dispatch<SetStateAction<boolean>>
}




const Modal = ({ setShowModal }:ModalProps)=>{
    return(
        <Container>
            <div className="content">
                <div>
                    À depender do tamanho da tela do seu aparelho possa ser que haja algumas
                    deformidades na apresentação do site, por isso é recomendado que instale 
                    nosso aplicativo na &nbsp;
                    <Link className="link" 
                        to='https://play.google.com/store/apps/details?id=com.gazua300.fakebank'>
                        Google Play
                    </Link>
                </div>
                <div className="btn-container">
                    <button className="close-btn" onClick={()=> setShowModal(false)}>Cancelar</button>
                    <button className="ok-btn" onClick={()=>{
                        location.href = 'https://play.google.com/store/apps/details?id=com.gazua300.fakebank'
                    }}>
                        Ok
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default Modal