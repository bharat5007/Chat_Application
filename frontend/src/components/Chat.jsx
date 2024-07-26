import { Box } from '@chakra-ui/react'
import React from 'react'
import SideDrawer from './SideDrawer'
import MyChats from './MyChats'
import { useUserContext } from './contextapi/XUser';
import ChatBox from './ChatBox';

const Chat = () => {
  const {selectedchat}=useUserContext();
  return (
    <div style={{width: "100%"}}>
          {<SideDrawer/>}
          <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
            {<MyChats/>}
            {selectedchat && <ChatBox/>}
          </Box>
        </div>
  )
}

export default Chat
