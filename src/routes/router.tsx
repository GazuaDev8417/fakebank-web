import {Routes, Route} from 'react-router-dom'
import Balance from '../pages/balance/Balance'
import Deposit from '../pages/deposit/Deposit'
import Payments from '../pages/payments/Payments'
import Transfer from '../pages/transfer/Transfer'
import Statement from '../pages/statement/Statement' 
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'



const Router = ():JSX.Element=>{
	return<Routes>
			<Route path='/fakebank-web' element={<Home/>}/>
			<Route path='/login' element={<Login/>}/>
			<Route path='/signup' element={<Signup/>} />
			<Route path='/balance' element={<Balance/>}/>
			<Route path='/deposit' element={<Deposit/>}/>
			<Route path='/pay' element={<Payments/>}/>
			<Route path='/statement' element={<Statement/>}/>
			<Route path='/transfer' element={<Transfer/>}/>
		  </Routes>
}
export default Router
