import styled from 'styled-components'


export const Container = styled.div`
    display: grid;
    justify-items: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 40vw;
        gap: 15px;
        margin: 10vh 0;
        padding: 30px 0;
        border-radius: 10px;
        box-shadow: 3px 3px 7px;
    }

    input{
        width: 65%;
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
        width: 67%;
    }

    .btn{
        border: 1px solid;
        border-radius: 5px;
        padding: 5px 25px;
        color: whitesmoke;
        background: transparent;
        transition: .5s;

        &:hover{
            cursor: pointer;
            background: rgba(0, 0, 50, .8);
            box-shadow: 1px 1px 2px;
        }

        &:active{
            transform: scale(.9);
        }       
    }
/* ---------------MEDIA QUERY----------------- */
    @media(max-width: 1200px){
        form{
            width: 50vw;
        }
    }

    @media(max-width: 800px){
        form{
            width: 70vw;
        }
    }
` 