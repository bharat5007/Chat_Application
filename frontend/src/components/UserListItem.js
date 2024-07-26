import React from 'react'
import { Avatar, Box, Text } from '@chakra-ui/react';

const UserListItem = ({user1,handleFunction}) => {
  return (
    <div>
       <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user1.name}
        src={user1.pic}
      />
      <Box>
        <Text>{user1.name}</Text>
        <Text fontSize="xs">
          <b>UserId : </b>
          {user1.userid}
        </Text>
      </Box>
    </Box>
    </div>
  )
}

export default UserListItem
