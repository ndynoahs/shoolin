import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

export function PrefetchLink({ to, preload, ...props }) {
  const { ref, inView } = useInView({ rootMargin: '200px' });

  useEffect(() => { if (inView) preload(); }, [inView, preload]);

  return <Link ref={ref} to={to} {...props} />;
}
