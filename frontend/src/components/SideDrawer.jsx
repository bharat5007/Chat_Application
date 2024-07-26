import { Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import { useUserContext } from './contextapi/XUser';
import ProfileModal from './ProfileModal';
import axios from "axios"
import UserListItem from './UserListItem';
// import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {
//   const history=useHistory();
  const {xuser,setxuser,setselectedchat}=useUserContext();
  const [search, setsearch]=useState("");
  const [searchresult,setsearchresult]=useState([]);
  const [loading,setloading]=useState(false);
  const [loadingchat,setloadingchat]=useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast=useToast();

  const logouthandler=()=>{
    localStorage.removeItem("userInfo");
    setxuser(null);
    // history.push("/");
  }

  // const accesschat=()=>{}
  const handlesearch=async ()=>{
    if(!search){
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setloading(true)
      // console.log(search);
      const config={
        headers: {
          Authorization: `Bearer ${xuser.token}`,
        },
      };

      const {data}= await axios.get(`/api/user?search=${search}`,config)
      // console.log(data);
      setloading(false);
      setsearchresult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  }

  const accesschat=async(userid)=>{
    try {
      setloadingchat(true);
      const config={
        headers: {
          Authorization: `Bearer ${xuser.token}`,
        },
      };

        const {data}= await axios.get(`/api/chat/newchat?userid=${userid}`,config);
      // console.log(data);
      setselectedchat(data);
      setloadingchat(false);
      onClose();
    } catch (error) {
      
    }
  }
  
  return (
    <div>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} bg={"white"} w={"100%"} p={"5px 10px 5px 10px"} borderWidth={"5px"}>
        <Tooltip label="Search users to chat" hasArrow placement='bottom-end'>
          <Button variant={"ghost"} onClick={onOpen}>
            <Text>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Work sans"}>Talk-A-Tive</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon></BellIcon>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size='sm' cursor={"pointer"} name={xuser.name} src={xuser.pic}/>
            </MenuButton>
            <MenuList>
              <ProfileModal user={xuser}>
              <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider/>
              <MenuItem onClick={logouthandler}>Log-Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
        <DrawerBody>
          <Box display={"flex"} paddingBottom={"2"}>
            <Input placeholder='Search by name or email' marginRight={"2"} value={search} onChange={(e)=> setsearch(e.target.value)}/>
            <Button onClick={handlesearch}>Go</Button>
          </Box>
          {loading ? (
            <div/>
          ):(
            searchresult?.map(user1=>(
              <UserListItem key={user1._id} user1={user1} handleFunction={()=>accesschat(user1._id)}/>
            ))
          )}
          {loadingchat && <Spinner ml="auto" d="flex" />}
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default SideDrawer
