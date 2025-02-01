import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface HeaderProps {
  username: string;
  logout: () => void;
}

export default function Header({ username, logout }: HeaderProps) {
    const [user, setUser] = useState(username || "");

  useEffect(() => {
    if (!username) {
      const storedUsername = Cookies.get("username");
      if (storedUsername) {
        setUser(storedUsername);
      }
    }
  }, [username]);

return (
    <header className="w-[1539px] min-h-[49px] mt-[55px] ml-[20px] rounded-full bg-[#000080] text-white flex items-center px-4">
      <h1 className="text-lg font-semibold">{username ? `Welcome, ${username}` : "Welcome"}</h1>
    {/*buttons for profile and logout*/}
    <nav className="flex items-center space-x-4 ml-auto">
      <button className="text-lg bg-[#000080] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer">Profile</button>
      <button onClick={logout} className=" text-lg bg-[#000080] text-white px-4 py-2 rounded-lg font-semibold">Logout</button>
    </nav>
    </header>
);
}