import { useState } from 'react';

export function useModal(initialState) {
  const [visible, setVisibility] = useState(initialState || false);
  const handleClick = (e) => {
    setVisibility(!visible);
  };

  return { visible, handleClick };
}
