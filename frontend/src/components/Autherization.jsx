import React from 'react'
import {Tabs, TabList, Tab, TabPanel, TabPanels, Box, Container} from "@chakra-ui/react"
import Signin from './Signin'
import Login from './Login'

const Autherization = () => {
  return (
    <Container maxW='xl' centerContent>
        <Box display="flex" justifyContent="center" p={3} bg={"white"} w={"100%"} m={"40px 0 15px 0"} borderRadius={"lg"} borderWidth={"1px"}>
            Chat-Application
        </Box>
      <Box bg={"white"} w={"100%"} p={4} borderRadius={'lg'} borderWidth={"1px"}>
      <Tabs variant='soft-rounded' colorScheme='green' >
        <TabList>
          <Tab width={"50%"}>Login</Tab>
          <Tab width={"50%"}>Sign-up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login></Login>
          </TabPanel>
          <TabPanel>
            <Signin></Signin>
          </TabPanel>
        </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Autherization
