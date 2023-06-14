import { useLayoutEffect } from 'react';
import { useSnapshot } from 'valtio/react';

function useProxy(proxy) {
  const snapshot = useSnapshot(proxy);
  let isRendering = true;
  useLayoutEffect(() => {
    isRendering = false;
  });
  return new Proxy(proxy, {
    get(target, prop) {
      return isRendering ? snapshot[prop] : target[prop];
    }
  });
}

export { useProxy };
