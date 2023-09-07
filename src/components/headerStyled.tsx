import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15vh;

    .home-icon{
        margin-top: -8vh;
        font-size: 2rem;
        cursor: pointer;
    }

    .logout-icon{
        margin-top: -8vh;
        font-size: 2rem;
        cursor: pointer;
    }

    #select{
        display: none;
    }

    #btn-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5vh;
    }

    @media(max-width: 700px){
        #btn-container{
            display: none;
        }

        #select{
            display: block;
            .select{
                width: 60vw;
                height: 35px;
            }
        }
    }	

    .btn-header{
        margin: 0 10px;
        border: 1px solid;
        border-radius: 15px;
        padding: 5px 20px;
        background: transparent;
        color: whitesmoke;
        transition: .5s;

        &:hover{
            cursor: pointer;
            background: rgba(0, 0, 50, .8);
            box-shadow: 1px 1px 2px;
            transform: scale(1.1);
        }

        &:active{
            transform: scale(.9);
        }
    }
`