import { useState, useEffect } from 'preact/hooks';

const useResizeUpdate = (initHeight = 800) => {

    const [innerWidth, setInnerWidth] = useState();
    const [innerHeight, setInnerHeight] = useState(initHeight);

    useEffect(() => {
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

    return {innerWidth, setInnerWidth, innerHeight, setInnerHeight};
};

export default useResizeUpdate;
