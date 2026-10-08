import { useEffect } from 'react';

// Sets document.title. Original Wix titles read "<Page> | Mysite" (the Wix default site name).
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | AI-Ways Forward` : 'AI-Ways Forward';
  }, [title]);
}
