import { renderHook } from '@testing-library/react';
import { RecoilRoot, RecoilState, useRecoilState } from 'recoil';

export function useTestRecoilState<T>(atom: RecoilState<T>) {
  const {
    result: {
      current: [state, setState],
    },
  } = renderHook(() => useRecoilState(atom), {
    wrapper: RecoilRoot,
  });

  return [state, setState] as const;
}
