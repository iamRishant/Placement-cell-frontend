import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGlobalUserObject=create(
    persist(
        (set) => ({
            user: null,
            setLogin: (userState) => set({user:userState}),
            setLogout: () => {
                localStorage.removeItem('token'),
                set({ user:null })
            },
        }),
        {
            name: "user-storage", // unique name
        }
    )
    // (set)=>({
    // user:null,
    // isLoggedIn:false,
    // setLogin:(userState)=>set({isLoggedIn:true,user:userState}),
    // setLogout:()=>set({isLoggedIn:false,user:null})
    // })
)
    
export default useGlobalUserObject