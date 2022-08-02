import { MutableRefObject, useEffect } from "react";

function useOutsideClick(
  elementRef: MutableRefObject<HTMLElement> | null, // TODO: убрать MutableRefObject
  handler: () => void,
  attached: null | number = null
) {
  useEffect(() => {
    if (attached === null) return;

    const handleClick = (e: any) => {
      // TODO: убрать эни
      if (!elementRef?.current) return;

      if (!elementRef.current?.contains(e.target)) {
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
