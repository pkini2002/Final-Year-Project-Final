import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Adminlogin from './Components/Adminlogin'
import Studentlogin from './Components/Studentlogin'
import Studenthome from './Components/Studenthome'
import Adminhome from './Components/Adminhome'
import Welcomepg from './Components/Welcomepg'
import Result from './Components/Result'
import Resultpg from './Components/Resultpg'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Adminlogin' element={<Adminlogin />}></Route>
        <Route path='/Studentlogin' element={<Studentlogin />}></Route>
        <Route path='/Adminhome' element={<Adminhome />}></Route>
        <Route path='/Studenthome' element={<Studenthome />}></Route>
        <Route path='/Welcomepg' element={<Welcomepg />}></Route>
        <Route path='/Result' element={<Result />}></Route>
        <Route path='/Resultpg' element={<Resultpg />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
