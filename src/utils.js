import {useSelector} from "react-redux";

export const useAuth = ()=>{
    return useSelector((state) => state.user)
}
export const  toWebp = (src)=>{
    let srcWithoutExt = src.replaceAll(' ','%20').split('.').slice(0,-1).join('.')
    return `${srcWithoutExt}.webp`
}
