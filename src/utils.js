import {useSelector} from "react-redux";

export const useAuth = ()=>{
    return useSelector((state) => state.user)
}
export const  toWebp = (src)=>{
    let lastDotPosition = src.lastIndexOf(".");
    let result = src.substring(0, lastDotPosition).replaceAll(' ','%20')
    return `${result}.webp`
}
