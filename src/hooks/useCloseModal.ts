import { useEffect } from "react";

export function useCloseModal(ref: React.RefObject<HTMLElement>, history: any) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
      history.push('/posts')
    }
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [])
}