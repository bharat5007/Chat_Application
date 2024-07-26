import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Text, useToast, FormControl, Input, Box } from '@chakra-ui/react'
import { useUserContext } from './contextapi/XUser';
import axios from 'axios';
import UserBadgeItem from './UserBadgeItem';
import UserListItem from './UserListItem';

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
// console.log
    const {xuser,setxuser}=useUserContext();

    const handlesearch=async(query)=>{
        setSearch(query);
        // console.log(query);
        if(!query) return ;
        try {
            setLoading(true);

            const config = {
                headers: {
                  Authorization: `Bearer ${xuser.token}`,
                },
              };

              const {data}= await axios.get(`/api/user?search=${query}`, config);
              // console.log(data);
              setLoading(false);
              setSearchResult(data);
        } catch (error) {
            
        }
    };

    const handlesubmit=async()=>{
        if(!groupChatName || !selectedUsers){
            toast({
                title: "fill All the details",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
              return;
        }

        try {
            
            const config = {
                headers: {
                  Authorization: `Bearer ${xuser.token}`,
                },
              };
              // console.log("!@#");
              const {data}=await axios.post("/api/group/create",{
                name: groupChatName,
                user: selectedUsers,
              },config);
              onClose();
              toast({
                title: "New Group Formed",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
        } catch (error) {
            
        toast({
          title: "Error",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };

    const handlegroup=(usertoadd)=>{
        if(selectedUsers.includes(usertoadd)){
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
              return;
        }
        setSelectedUsers([...selectedUsers, usertoadd]);
    };

    const handleDelete=(deleteuser)=>{
        setSelectedUsers(selectedUsers.filter(sel=>sel._id!==deleteuser._id));
    };


    // const fun=()=>{console.log(selectedUsers)};
  return (
    <div>
        
            <span onClick={onOpen}>{children}</span>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader fontSize="35px"
                    fontFamily="Work sans"
                    display="flex"
                    justifyContent="center">Create-Group</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
                    <FormControl>
                        <Input placeholder='chat-name' onChange={(e)=>setGroupChatName(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <Input placeholder='Add users' onChange={(e)=>handlesearch(e.target.value)} />
                    </FormControl>

                    <Box w="100%" d="flex" flexWrap="wrap" > 
                    {   selectedUsers.map((u)=>(
                        <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleDelete(u)}/>
                    ))}
                    </Box>
                 <Box display={"flex"} flexDir={"column"} width={"100%"}>
                 {loading ? (
                     <div>loading</div>
                    ):(
                    searchResult
                    ?.map((user)=>
                        <UserListItem 
                    key={user._id} 
                    user1={user} 
                    handleFunction={()=>handlegroup(user)} />
                )
                )}
                </Box>
                </ModalBody>
            
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={handlesubmit}>
                    Create
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    </div>
  )
}

GroupChatModal.propTypes = {

}

export default GroupChatModal
