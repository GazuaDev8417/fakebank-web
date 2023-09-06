import { BrowserRouter } from "react-router-dom"
import { createGlobalStyle } from "styled-components"
import Router from "./routes/router"


const GlobalStyle = createGlobalStyle`
  body{
    background-image: url(/images/wallpaper.jpg);
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
      <GlobalStyle/>
      <Router/>
    </BrowserRouter>
  )
}

export default App
