import { MutableRefObject, useEffect } from "react";

function useOutsideClick(
  elementRef: MutableRefObject<HTMLElement | null>,
  handler: () => void,
  attached: null | number = null
) {
  useEffect(() => {
    if (attached === null) return;

    const handleClick = (e: MouseEvent) => {
      if (!elementRef?.current) return;

      if (!elementRef.current?.contains(e.target as HTMLElement)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [elementRef, handler]);
}

export default useOutsideClick;
