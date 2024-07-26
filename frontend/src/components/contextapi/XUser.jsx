import { createContext, useContext, useState } from 'react'

export const UserContext= createContext(null);

export const useUserContext = () => {
	return useContext(UserContext);
};

export const UserProvider=(props)=>{
    const [xuser,setxuser]=useState(JSON.parse(localStorage.getItem("userInfo")) || null);
    const [selectedchat,setselectedchat]=useState();
    
    return (
        <UserContext.Provider value={{xuser,setxuser,selectedchat,setselectedchat}}>
            {props.children}
        </UserContext.Provider>
    )
}
