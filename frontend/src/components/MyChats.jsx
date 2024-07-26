import React, { useEffect, useState } from 'react'
import { useUserContext } from './contextapi/XUser';
import { Box, Button, Stack, useToast, Text } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import GroupChatModal from './GroupChatModal';

const MyChats = () => {
  const {xuser,setxuser,selectedchat,setselectedchat}=useUserContext();
  const [chats,setchats]=useState();
  const toast=useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${xuser.token}`,
        },
      };
      
      const { data } = await axios.get("/api/chat/users", config);
      // console.log(data);
      setchats(data);
      // console.log(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(()=>{
    fetchChats();
  },[selectedchat]);
  return (
    
      <Box 
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      padding={"3"}
      bg="white"
      width={{ base: "100%", md: "25%" }}
      borderRadius="lg"
      borderWidth="1px">
        <Box 
        paddingBottom={"3"}
        paddingLeft={"3"}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}>
          My Chats
          <GroupChatModal>
          <Button  d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon/>}>
              New Group-Chat
            </Button>
          </GroupChatModal>
        </Box>

        <Box display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden">
          {chats?(
            <Stack overflowY={"scroll"} >
              { chats.map((chat)=>(
                <Box onClick={() => setselectedchat(chat)}
                // <Box
                cursor="pointer"
                bg={"#E8E8E8"}
                color={ "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}>
                  <Text> {chat.name || (chat.participants[0].userid===xuser.userid ? chat.participants[1].userid: chat.participants[0].userid) }
                </Text>
                {/* {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )} */}
                </Box>
              ))}
            </Stack>
          ):(<div />)}
        </Box>
      </Box>
  )
}

export default MyChats
