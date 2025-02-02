import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { HiViewGrid, HiCurrencyDollar, HiLogout } from 'react-icons/hi';
import { CgProfile } from "react-icons/cg";
import { GiReceiveMoney } from "react-icons/gi";
import { SiContactlesspayment } from "react-icons/si";
import { Dropdown } from 'flowbite-react';

interface HeaderProps {
  username: string;
  logout: () => void;
  balance: number;
}

export default function Header({ username, logout, balance }: HeaderProps) {
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
    <header className="max-w-full md:max-w-[1539px] w-full min-h-[49px] mt-4 md:mt-[55px] ml-1 md:ml-[5px] rounded-full bg-[#000080] text-white flex items-center px-4">
      <h1 className="text-lg font-semibold">{username ? `Welcome, ${username}` : "Welcome"}</h1>
    {/*buttons for profile and logout*/}
    <nav className="flex items-center space-x-4 ml-auto lg:mr-[10px]">
      <Dropdown label="Menu">
      <Dropdown.Item icon={CgProfile}>Profile</Dropdown.Item>
      <Dropdown.Item icon={HiViewGrid}>Bookings</Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>Balance: {balance} </Dropdown.Item>
      <Dropdown.Item icon={GiReceiveMoney}>Top up</Dropdown.Item>
      <Dropdown.Item icon={SiContactlesspayment}>Payment</Dropdown.Item>
      <Dropdown.Item icon={HiLogout} onClick={logout}>Sign out</Dropdown.Item>
    </Dropdown>
    </nav>
    </header>
);
}