import { useEffect, useState } from "react";


export const useOrigin = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // if type of window is not undefined and if we have the window location.orgigin, then render wingow.location.origin, else render empty string
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""

    if (!mounted) {
        return "";
    }

    return origin;
}