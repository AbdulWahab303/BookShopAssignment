import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";


const UserContext=createContext();

export function UserProvider({ children }) {

    const [session,setSession]=useState({});

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
          axios
            .get('/api/auth/login', { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setSession(res.data.user))
            .catch(() => logout());
        }
        else{
            setSession(null);
        }
      }, []);

    
    const login=async(email,password)=>{
        try {
            const response=await axios.post("http://localhost:3000/api/auth/login",{email:email,password:password});
            // console.log(response);
            
            Cookies.set('token',response.data.token);

        } catch (error) {
            console.log("Error1");
            return false;
        }

        const token=Cookies.get('token');
        
        if(token){
            try {
                const response2=await axios.get("http://localhost:3000/api/auth/login",{headers:{
                    Authorization:`Bearer ${token}`
                }});
                // console.log(response2);
                setSession(response2.data.user);
                return true;
            } catch (error) {
                console.log("Error in fetching session details");
            }
        }
        return false;

    }

    const logout=async()=>{
        try {
            const response=await axios.get("http://localhost:3000/api/auth/logout");
        } catch (error) {
            console.log("Error in Logout");
            return false;
        }
        Cookies.remove('token');
        setSession(null);
        return true;
    }


  

  return (
    <UserContext.Provider value={{ login,logout,session }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
