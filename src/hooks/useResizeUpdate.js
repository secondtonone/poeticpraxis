import { useState, useEffect } from 'preact/hooks';

const useResizeUpdate = () => {

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    useEffect(() => {
        const updateDimensions = () => {
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth)
        };

        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return [innerWidth, setInnerWidth, innerHeight, setInnerHeight];
};

export default useResizeUpdate;
