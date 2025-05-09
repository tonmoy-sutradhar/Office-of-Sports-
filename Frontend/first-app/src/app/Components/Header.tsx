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
  bookingPageCall: () => void;
  addBalancePageCall: () => void;
  profilePageCall: () => void;
  balance: number;

}

export default function Header({ username, logout, balance, bookingPageCall , addBalancePageCall, profilePageCall }: HeaderProps) {
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
    <header className="max-w-full sm:max-w-[1539px] sm:w-full sm:min-h-[49px]  sm:mt-[55px]  sm:ml-[5px] rounded-full bg-[#000080] text-white flex items-center px-4">
      <h1 className="text-lg font-semibold">{username ? `Welcome, ${username}` : "Welcome"}</h1>
    {/*buttons for profile and logout*/}
    <nav className="flex items-center space-x-4 ml-auto sm:mr-[18px]">
      <Dropdown label="Menu">
      <Dropdown.Item icon={CgProfile} onClick={profilePageCall}>Profile</Dropdown.Item>
      <Dropdown.Item icon={HiViewGrid} onClick={bookingPageCall}>Bookings</Dropdown.Item>
      <Dropdown.Item icon={HiCurrencyDollar}>Balance: {balance} </Dropdown.Item>
      <Dropdown.Item icon={GiReceiveMoney} onClick={addBalancePageCall}>Top up</Dropdown.Item>
      <Dropdown.Item icon={HiLogout} onClick={logout}>Sign out</Dropdown.Item>
    </Dropdown>
    </nav>
    </header>
);
}