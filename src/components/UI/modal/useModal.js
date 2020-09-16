import { useState } from 'react';

export function useModal() {
  const [visible, setVisibility] = useState(false);
  const handleClick = (e) => {
    setVisibility(!visible);
  };

  return { visible, handleClick };
}
