import { Box, Button, FormControl, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useUserContext } from './contextapi/XUser';
import axios from 'axios';
import ScrollableFeed from 'react-scrollable-feed'
import { io } from 'socket.io-client';

const ENDPOINT = "http://localhost:8000/";
var socket, selectedchatcompare;

const ChatBox = () => {
    const {xuser,selectedchat,setselectedchat}=useUserContext();
    const [user,setuser]=useState(selectedchat.participants[1].userid === xuser.userid ? selectedchat.participants[0] : selectedchat.participants[1]);
    const [message,setmessage]=useState();
    const [newmessage, setnewmessage]=useState();
    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit('setup', xuser);
      socket.on('connected', () => setSocketConnected(true));
      return () => {
        socket.disconnect();
      };
    }, []);
    
    const allmessages=async()=>{
      try {
        const config={
          headers: {
            Authorization: `Bearer ${xuser.token}`,
          },
        };
        // console.log(user);
        let a=0;
        if(selectedchat.members) a=1;
        const sender=xuser._id;
        const reciever= a===1 ?   selectedchat._id : (user._id);
        const  {data} = await axios.get(`http://127.0.0.1:8000/api/chat/allmessage?senderid=${sender}&receiverid=${reciever}&isgroup=${a}`,config);
          setmessage(data[0].messages);
          socket.emit('join chat', selectedchat._id);
        } catch (error) {
      }
    }

    const submitmessage=async()=>{
      try {
        const config={
          headers: {
            Authorization: `Bearer ${xuser.token}`,
          },
        };
        let a=0;
        if(selectedchat.members) a=1;
        // console.log(selectedchat);
        const sender=xuser._id;
        const reciever= a===1 ?  selectedchat._id : (user._id);
        const  {data} = await axios.get(
          `/api/chat/message?message=${newmessage}&senderid=${sender}&receiverid=${reciever}&isgroup=${a}`,config);
          // console.log(data);
          // console.log("!@#$%");
          socket.emit('new message', data);
          setmessage([...message, data]);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      allmessages();
      selectedchatcompare= selectedchat;
    },[user])

    useEffect(() => {
      const fetchUserAndMessages = async () => {
        await setuser(
          selectedchat.participants[1].userid === xuser.userid
            ? selectedchat.participants[0]
            : selectedchat.participants[1]
        );
        console.log(user);
      };
    
      // Call the function defined above
      fetchUserAndMessages();
    }, [JSON.stringify(selectedchat)]);

    useEffect(() => {
      console.log(socket);
      if (socket) {
        socket.on('message received', (newMessageReceived) => {
          // console.log("*&^%$#12345");
          // if (!selectedchatcompare || selectedchatcompare._id !== newMessageReceived.chat._id) {
            // give notification
          // } else {
            setmessage([...message,newMessageReceived]);
          // }
        });
      }
    });

  return (
    <Box
    display={{ base: "flex", md: "flex" }}
    alignItems="center"
    flexDir="column"
    padding={3}
    bg="white"
    width={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
    <Text
      fontSize={{ base: "28px", md: "30px" }}
      pb={3}
      px={2}
      width="100%"
      fontFamily="Work sans"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgColor="lightgrey"
        px={3}
        py={1}
        width={"100%"}
        borderRadius="md"
      >
        {user.userid}
      </Box>
    </Text>
    
    <Box
      display="flex"
      flexDir="column"
      width="100%"
      height="100%"
      overflowY="auto"
      bgColor="white"
      p={3}
      borderRadius="lg"
      borderWidth="1px"
    >
      <ScrollableFeed>
        {message && message.map((m, i) => (
          <Box
            key={m._id}
            className={`message ${m.sender === xuser._id ? "user" : "other"}`}
          >
            {m.message}
          </Box>
        ))}
      </ScrollableFeed>
    </Box>
    
    <Box
      display="flex"
      width="100%"
      mt={3}
    >
      <FormControl>
        <InputGroup>
          <Input
            placeholder="Enter Message"
            onChange={(e) => setnewmessage(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={submitmessage}>
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Box>
  </Box>
  )
}

export default ChatBox
