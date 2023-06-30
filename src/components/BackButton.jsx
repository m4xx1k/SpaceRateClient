import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {NavigationContext} from "./NavigationProvider";

export function BackButton({classname, children}) {
    const navigate = useNavigate();
    const navigationStack = useContext(NavigationContext);
    console.log(navigationStack)
    // Не показуємо кнопку, якщо користувач ще не переходив за посиланнями в межах додатку
    if (navigationStack.length <= 1) {
        return null;
    }
    const handleGoBack = () => {
        if (navigationStack.length > 1) {
            navigate(-1)
        }
    }

    return <button className={classname} onClick={handleGoBack}>{children}</button>;
}
