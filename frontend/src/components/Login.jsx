import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
// import { useUserContext } from "./components/contextapi/XUser";
import { useUserContext } from './contextapi/XUser';

const Login = () => {
    const {xuser,setxuser}=useUserContext();
    const [email,setemail]=useState();
    const [password,setpassword]=useState();
    const [showp,setshowp]=useState(false);
    const toast=useToast();
    const navigate = useNavigate();
  
    const handleclickp=()=>{
      setshowp(!showp);
    }
  
    const handlesubmit=async()=>{
      if(!email || !password){
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
  
        return ;
      }
  
      try {
  
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const gmail=email;
        const  {data} = await axios.post(
          "http://127.0.0.1:8000/api/user/login",
          {gmail, password },
          config
        );
        
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        
        // console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        setxuser(data);
        // console.log(xuser);
        navigate("/chats");

        // history.push("/chats");
  
      } catch (error) {
        toast({
            title: "Incorrect Password",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
      }
    }
    return (
      <div>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input  placeholder='Enter Your email' onChange={(e)=>setemail(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel >Enter Password</FormLabel>
          <InputGroup>
          <Input type={showp? "Text":"password"} placeholder='Enter Youre Password' onChange={(e)=>setpassword(e.target.value)} />
          <InputRightElement width={"4.5rem"}>
          <Button h="1.75rem" size="sm" onClick={handleclickp}>
                  {showp ? "Hide": "Show"}
            </Button>
          </InputRightElement>
          </InputGroup>
        </FormControl>
  
        <Button colorScheme='blue' width={"100%"} style={{marginTop: 15}} onClick={handlesubmit}>Signup</Button>
      </div>
    )
}

export default Login
