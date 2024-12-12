import { createContext, useState } from "react";

const UserContext = createContext();



export const UserContextProvider = ({children}) =>{
    const storedUser = localStorage.getItem("user");
    const initialAuthUser = storedUser ? JSON.parse(storedUser) : null;
    const [user, setUser] = useState(initialAuthUser);
    console.log(user);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;

