// 防抖
const debounce = (fn, delay = 1000) => {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
};


export default debounce;
