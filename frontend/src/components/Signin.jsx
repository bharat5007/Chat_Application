import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useId, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './contextapi/XUser';

const Signin = () => {
  const {xuser,setxuser}=useUserContext();
  const [name,setname]=useState();
  const [userid,setuserid]=useState();
  const [email,setemail]=useState();
  const [password,setpassword]=useState();
  const [confirm,setconfirm]=useState();
  const [showp,setshowp]=useState(false);
  const [showcp,setshowcp]=useState(false);
  const toast=useToast();
  const navigate = useNavigate();
  // const history=useHistory();

  const handleclickcp=()=>{
    setshowcp(!showcp);
  }

  const handleclickp=()=>{
    setshowp(!showp);
  }

  const handlesubmit=async()=>{
    if(!name || !email || !password || !confirm || !userid){
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return ;
    }

    if(password!==confirm){
      toast({
        title: "Password does not match with password",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    try {

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const xpassword=password;
      const gmail=email;
      const  {data} = await axios.post(
        "http://127.0.0.1:8000/api/user/signin",
        {name, gmail, xpassword, userid },
        config
      );
      
      toast({
        title: "Sign-in Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // setUser(data);
      setxuser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
      // history.push("/chats");

    } catch (error) {
      toast({
        title: "User already exist",
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
        <FormLabel>Name</FormLabel>
        <Input  placeholder='Enter Your name' onChange={(e)=>setname(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>UserId</FormLabel>
        <Input  placeholder='Enter Your name' onChange={(e)=>setuserid(e.target.value)} />
      </FormControl>
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
      <FormControl>
        <FormLabel >Confirm Password</FormLabel>
        <InputGroup>
        <Input type={showcp ? "Text":"password"}  onChange={(e)=>setconfirm(e.target.value)} />
        <InputRightElement width={"4.5rem"}>
        <Button h="1.75rem" size="sm" onClick={handleclickcp}>
                {showcp ? "Hide": "Show"}
          </Button>
        </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button colorScheme='blue' width={"100%"} style={{marginTop: 15}} onClick={handlesubmit}>Signup</Button>
    </div>
  )
}

export default Signin
