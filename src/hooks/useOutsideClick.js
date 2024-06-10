/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";

export default function useOutsideClick(handler) {
    const ref = useRef(null);

    useEffect(() => {
        const action = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        }

        document.addEventListener('click', action, true);

        return () => {
            document.removeEventListener('click', action, true);
        }

    }, [ref, handler]);

    return ref;
}