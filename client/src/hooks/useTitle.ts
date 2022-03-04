import { useEffect, useState } from 'react';

const useTitle = (newTitle: string = '북로그') => {
  const [title, setTitle] = useState(newTitle);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) htmlTitle.innerText = title;
  }, [title]);

  return setTitle;
};

export default useTitle;
