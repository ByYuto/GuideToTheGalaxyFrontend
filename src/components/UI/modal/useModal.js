import { useState } from 'react';

export function useModal() {
  const [visible, setVisibility] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setVisibility(!visible);
  };

  return { visible, handleClick };
}
