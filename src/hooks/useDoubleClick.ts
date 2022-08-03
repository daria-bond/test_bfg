import { MutableRefObject, useCallback, useRef } from "react";

export const useDoubleClick = (
  doubleClickFunc: () => void,
  clickFunc: () => void,
  timeout = 200
) => {
  const clickTimeout: MutableRefObject<NodeJS.Timeout | undefined> =
    useRef(undefined);
  const clicks = useRef<number>(0);

  const clearClickTimeout = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = undefined;
    }
  };

  return useCallback(() => {
    clicks.current = clicks.current + 1;

    if (clickFunc && clicks.current === 1) {
      clickTimeout.current = setTimeout(() => {
        clicks.current = 0;
        clickFunc();
      }, timeout);
    }
    if (clicks.current === 2) {
      clearClickTimeout();
      doubleClickFunc();
      clicks.current = 0;
    }
  }, [clickFunc, doubleClickFunc]);
};
``;
