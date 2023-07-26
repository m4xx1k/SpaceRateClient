import {useSelector} from "react-redux";

export const useAuth = ()=>{
    return useSelector((state) => state.user)
}
export const  toWebp = (src)=>{
    let srcWithoutExt = src.replaceAll(' ','%20').split('.').slice(0,-1).join('.')
    return `${srcWithoutExt}.webp`
}
export const monthNames = [
    'январь',   'февраль',
    'март',     'апрель',
    'май',      'июнь',
    'июль',     'август',
    'сентябрь', 'октябрь',
    'ноябрь',   'декабрь'
]
export function formatDate(date) {
    // Перевірка, чи передано об'єкт Date або час в мілісекундах
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    // Функція для додавання 0 зліва для чисел менше 10
    function padNumber(num) {
        return num < 10 ? '0' + num : num;
    }

    const day = padNumber(date.getDate());
    const month = padNumber(date.getMonth() + 1); // Місяці в JS починаються з 0, тому додаємо 1
    const year = date.getFullYear();
    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());

    // Повертаємо отриманий рядок з датою у форматі 'DD.MM.YYYY HH:mm'
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
export const daysNames= ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
