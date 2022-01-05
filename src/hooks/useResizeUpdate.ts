import { useState, useLayoutEffect } from 'preact/hooks';

const useResizeUpdate = (initHeight: number = 800) => {
    const [innerWidth, setInnerWidth] = useState<number>(0);
    const [innerHeight, setInnerHeight] = useState<number>(initHeight);

    useLayoutEffect(() => {
        const updateDimensions = () => {
            requestAnimationFrame(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
            });
        };

        updateDimensions();

        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return { innerWidth, setInnerWidth, innerHeight, setInnerHeight };
};

export default useResizeUpdate;
