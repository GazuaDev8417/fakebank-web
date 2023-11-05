import styled from 'styled-components'


export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15vh;

    .header-icon{
        margin-top: -8vh;
        font-size: 2rem;
        cursor: pointer;               
    }

    .menu{
        display: none;
    }

    #select{
        display: none;
    }

    .btn-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5vh;
    }

    .btn-container .btn-header-container{
        display: flex;
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

    @media(max-width: 700px){
        margin-top: 10vh;

        .menu{
            display: block;
        }

        .btn-container{
            display: flex;
            justify-content: center;
            text-align: center;
            position: absolute;
            top: 5%;
            right: 0;
            left: 0;
            background-color: rgba(0, 0, 50, .8);
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            padding: 40px 0;
            transition: .5s;
        }

        .btn-container.active{
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        .btn-container .btn-header-container{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 90%;
            font-size: 1.2rem;
        }

        .btn-container div .btn-header:hover{
            background-color: rgba(0, 0, 250, .5);
        }

        

        /* #select{
            display: block;
            .select{
                width: 60vw;
                height: 35px;
            }
        } */
    }  
    
`