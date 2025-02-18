import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy ,Suspense } from 'react'
function App() {
   
  const Home = lazy(()=>import("./components/home/home"));
 const AdminSignup = lazy(()=>import('./admin/signup'));
 const AdminLogin = lazy(()=>import('./admin/login'));
 const Add = lazy(()=>import('./admin/addcontent'));
 const Dashboard = lazy(()=>import('./admin/dashboard'));
 const Detailedcontent = lazy(()=>import('./components/home/detailedcontents'));
 const Addvideo = lazy(()=>import('./admin/addvideos'));
  return (
    <>
      <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/adminsignup' element={<AdminSignup/>}/>
          <Route path='/adminlogin' element={<AdminLogin/>}/>
          <Route path='/addcontent' element={<Add/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/detailed-content/:id' element={<Detailedcontent/>}/>
          <Route path='/addvideos' element={<Addvideo/>}/>
        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
