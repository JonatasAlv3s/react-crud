import { useCallback, useRef } from "react";



export const useDebounce = (delay = 500, notDelayInFirstTime = true) => {
    const inFirstTime = useRef(notDelayInFirstTime);
    const deboucing = useRef<NodeJS.Timeout>();

    const debounce = useCallback((func: () => void) => {
        if (inFirstTime.current) {
            inFirstTime.current = false;
            func();
        } else {

            if (deboucing.current) {
                clearTimeout(deboucing.current);
            }

            deboucing.current = setTimeout(() => { func(); }, delay);
        }

    }, [delay]);

    return { debounce };
}