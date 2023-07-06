import {useSelector} from "react-redux";

export const useAuth = ()=>{
    return useSelector((state) => state.user)
}
export const  toWebp = (src)=>{
    console.log(src)
    let srcWithoutExt = src.replaceAll(' ','%20').split('.').slice(0,-1).join('.')
    console.log(src.replaceAll(' ','%20').split('.').slice(0,-1))
    return `${srcWithoutExt}.webp`
}
