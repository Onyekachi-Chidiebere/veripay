import React, { useState } from 'react';
import './menu.css'
import { NavLink } from 'react-router-dom';

const Menu = (props) => {
  let sidebar = document.querySelector('.root-side-bar');
  const [open, setOpen] = useState(false);

  let { title, links, searchQuerry, key, rootLink, padding } = props;
  // const [padding, setPadding] = useState(40);
  //   let padding = props.padding;

  return (
    <div key={key} style={{ width: '100%', alignContent: 'center' }}>
      <div className="menu-title" onClick={() => setOpen(!open)}>
        <NavLink
          onClick={(e) => e.preventDefault()}
          className={({ isActive }) =>
            isActive
              ? 'dashboard-active-link head-link'
              : 'dashboard-inactive-link head-link'
          }
          to={rootLink}
          activeclassname="current"
        >
          <span style={{ paddingLeft: padding }}>{title}</span>
          <svg
            className={open ? 'dashboard-menu-icon ' : ''}
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.691037 0.891231C0.826038 0.756398 1.00904 0.680664 1.19984 0.680664C1.39064 0.680664 1.57364 0.756398 1.70864 0.891231L5.99987 5.18243L10.2911 0.891231C10.4276 0.76405 10.6081 0.694811 10.7946 0.698103C10.9812 0.701394 11.1591 0.776957 11.2911 0.908874C11.423 1.04079 11.4985 1.21876 11.5018 1.40529C11.5051 1.59182 11.4359 1.77234 11.3087 1.90883L6.50867 6.70883C6.37367 6.84366 6.19067 6.9194 5.99987 6.9194C5.80906 6.9194 5.62606 6.84366 5.49106 6.70883L0.691037 1.90883C0.556203 1.77383 0.480469 1.59083 0.480469 1.40003C0.480469 1.20923 0.556203 1.02623 0.691037 0.891231Z"
              fill="white"
            />
          </svg>
        </NavLink>
      </div>
      <div
        className={
          searchQuerry === '' && !open ? 'menu-slider closed' : 'menu-slider'
        }
      >
        {links.map(
          (link, index) => {
            if (index === 0) padding += 20;
            if (link.name.toLowerCase().includes(searchQuerry.toLowerCase())) {
              if (link.child.length === 0) {
                return (
                  <NavLink
                    onClick={() => {
                      sidebar.classList.toggle('root-side-bar-show');
                    }}
                    key={index}
                    className={({ isActive }) =>
                      isActive
                        ? 'dashboard-active-link'
                        : 'dashboard-inactive-link'
                    }
                    to={link.link}
                    activeclassname="current"
                    end
                  >
                    <span style={{ paddingLeft: padding }}>{link.name}</span>
                  </NavLink>
                );
              }
              return (
                <div style={{ width: '100%' }} key={link.name}>
                  <Menu
                    padding={padding}
                    title={link.name}
                    searchQuerry={searchQuerry}
                    links={link.child}
                    rootLink={link.rootLink}
                  />
                </div>
              );
            }
          }
          // <p className='menu-links'>{link.name}</p>
        )}
      </div>
    </div>
  );
};

export default Menu;

