import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

const useGlobalUserObject=create((set, get)=>({
    user:null,
    isLoggedIn:false,
    setLogin: ({ token, user }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("currUser", JSON.stringify(user));
        set({ isLoggedIn: true, user: { ...user, token } });
      },
    setLogout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currUser")
        set({ isLoggedIn: false, user: null });
      },
    loadUserFromStorage: () => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("currUser");
      
        if (token && user) {
          //if condition below - token validation 
          if(get().isTokenValid(token)){
            set({
              isLoggedIn: true,
              user: { ...JSON.parse(user), token },
            });
          } else {
            //means token is expired or log out user
            get().setLogout();
          }
        } else {
          set({ isLoggedIn: false, user: null });
        }
      },

      isTokenValid: (token) => {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          return decoded.exp > currentTime;
        } catch (error) {
          console.error("Error validating token:", error);
          return false;
        }
      },

      checkTokenExpiry: ()=>{
        const token = localStorage.getItem("token");
        if(!token) return false;
        
        const isValid = get().isTokenValid(token);  
        if(!isValid){
          get().setLogout();
        }
        return isValid;
      }
}));

export default useGlobalUserObject