import React, { useState, useEffect } from 'react';
import logo from '@/images/logo.svg'

const IdleScreen = () => {
  const [isIdle, setIsIdle] = useState(true);
  useEffect(() => {
    window.electronWindow.onUserIdle(() => {
      setIsIdle(true)
    })
    // Reset idle timer when the user interacts
    const resetIdle = () => {
      setIsIdle(false);
      window.electronWindow.userActivity();
    };

    // Add event listeners for user activity (click, keydown, mousemove)
    window.addEventListener('click', resetIdle);
    window.addEventListener('keydown', resetIdle);

    // Cleanup event listeners
    return () => {
        window.removeEventListener('click', resetIdle);
        window.removeEventListener('keydown', resetIdle);
    };

  }, []);

  return (
    <>
    {isIdle && 
      <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center absolute bg-black top-0 left-0 text-white'>
        <img className="logo w-[200px]" src={logo} alt="" />
        <div className='mt-8'>Нажмите, чтобы взаимодействовать</div>
      </div>
    }
    </>
  );
};

export default IdleScreen;
