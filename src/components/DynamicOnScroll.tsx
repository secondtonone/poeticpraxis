import { useEffect, useState } from 'preact/hooks';

export interface DynamicOnScrollProps {
  children: React.ReactNode
  placeholder?: React.ReactNode
  onScroll?: () => void
  instant?: boolean
}

const DynamicOnScroll: React.FC<DynamicOnScrollProps> = ({
  instant = false,
  children,
  placeholder,
  onScroll
}) => {
  const [isLoaded, setLoading] = useState(instant);

  useEffect(() => {
    const handler = () => {
      if (!isLoaded) setLoading(true);
      if (typeof onScroll === 'function') onScroll();
      window.removeEventListener('scroll', handler);
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [isLoaded, onScroll]);

  return (
    <>
      {isLoaded ? children : placeholder}
    </>
  );
};

export default DynamicOnScroll;
