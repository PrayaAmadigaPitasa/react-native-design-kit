import {DependencyList, useEffect, useRef} from 'react';

export function useDidUpdate(
  effect: React.EffectCallback,
  deps?: DependencyList,
) {
  const initialize = useRef(false);

  useEffect(() => {
    if (initialize.current) {
      return effect();
    } else {
      initialize.current = true;
    }
  }, deps);
}
