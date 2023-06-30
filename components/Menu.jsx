import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const Menu = memo(({ active, userRole, userDivision }) => {
  const activeLink = 'flex items-center bg-gray-200 font-medium px-2 h-8 rounded-md';

  const links = [
    {
      name: 'Dashboard',
      link: '/',
    },
    {
      name: 'Spare Part',
      link: '/sparepart',
    },
    {
      name: 'Part Request',
      link: '/partrequest',
    },
    {
      name: 'Part Discrepancy',
      link: '/partdiscrepancy',
    },
    {
      name: 'User Management',
      link: '/usermanagement',
    },
    {
      name: 'User Log',
      link: '/userlog',
    },
  ];

  const filteredLinks = links.filter((link) => {
    if ((link.name === 'User Management' || link.name === 'User Log') && userRole !== 'Admin') {
      return false; // Hide User Management and System Logs for non-admin users
    } else if (link.name === 'Part Discrepancy' && !(userRole === 'Admin' || (userRole === 'Manager' && userDivision === 'Warehouse'))) {
      return false; // Hide Part Discrepancy for non-admin and non-manager (Warehouse) users
    }
    return true; // Show other links for all other users
  });

  return (
    <div
      className={`flex w-38 justify-center z-10 bg-white p-0 border-solid border-2 rounded-r-lg drop-shadow-xl h-full fixed left-0 transform transition-transform duration-300 ${
        active ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0  top-0 pt-20`}
    >
      <ul className="flex flex-col gap-4 w-full">
        {filteredLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.link}
            className={({ isActive }) =>
              isActive ? activeLink : 'flex items-center hover:bg-gray-200 font-normal px-2 h-8 rounded-md'
            }
          >
            {link.name}
          </NavLink>
        ))}
      </ul>
    </div>
  );
});

export default Menu;