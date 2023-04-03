import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Home = ({isLoggedIn, setIsLoggedIn}) => {
    let history= useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            localStorage.clear()
        },30000)
        
    },[])
    let onclickHandle=()=>{
        setIsLoggedIn(!isLoggedIn)
        history('/question')
    }
  return (
    <>
    <div className="wrapper">
        <div className="main-text">
           <h1> Welcome to Survey</h1>
            <Button variant='warning' onClick={onclickHandle}>Start Survey</Button>
        </div>
        
       
    </div>
    </>
  )
}

export default Home
