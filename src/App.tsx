import { BrowserRouter } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import { GlobalState } from "./global/Context"
import Router from "./routes/router"
const wallpaper = 'https://img.freepik.com/premium-vector/banking-finance-concept-illustration_387612-169.jpg'


const GlobalStyle = createGlobalStyle`
  body{
    background-image: url(${wallpaper});
    background-size: cover;
    background-position: center;
    color: whitesmoke;
    margin: 30px;
	}

  h3{
    font-size: 1.5rem;
    font-weight: 300;
    text-shadow: 1px 1px 2px whitesmoke;
  }
`

function App() {

  return (
    <BrowserRouter>
      <GlobalState>  
        <GlobalStyle/>
        <Router/>
      </GlobalState>
    </BrowserRouter>
  )
}

export default App
