import React, { useEffect, useState } from 'react'
import Switch from 'react-switch';
// import React, { useState, useEffect } from "react";

const ThemeToggle = () => {

    // const [isDarkMode, setIsDarkMode] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // On component mount, check if the user already has a preferred theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', !isDarkMode);
    localStorage.setItem('theme', newTheme);
  };


  return (
    <div className="flex items-center">
      <span className="mr-2">{isDarkMode ? '🌙' : '☀️'}</span>
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
      />
    </div>
  );
};

export default ThemeToggle

