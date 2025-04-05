import { create } from "zustand";

const useGlobalUserObject=create((set)=>({
    user:null,
    isLoggedIn:false,
    setLogin:(userState)=>set({isLoggedIn:true,user:userState}),
    setLogout:()=>set({isLoggedIn:false,user:null})
}))

export default useGlobalUserObject