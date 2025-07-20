import {create} from "zustand"
 export const useThemeStore = create((set)=>({
    theme:localStorage.getItem("Talket-theme")||"dark",
    setTheme:(theme) =>{
        localStorage.setItem("Talket-theme",theme);
        set({theme})
    },
 }))