import { useEffect } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';

interface IProps {
  node: RecoilState<any>;
  onClick(value: boolean): void;
}

export const RecoilObserver = ({ node, onClick }: IProps) => {
  const value = useRecoilValue(node);

  useEffect(() => {
    onClick(value);
  }, [onClick, value]);
  return null;
};
