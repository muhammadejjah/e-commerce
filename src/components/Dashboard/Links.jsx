import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Links = ({ name, path, icon, role, isOpen, userRole, iconSize }) => {

    return role.includes(userRole) ? (<NavLink
        className="side-bar-items "
        to={path}
        end
    >
        <FontAwesomeIcon
        width={25}
            size={iconSize ? iconSize : 'lg'}
            icon={icon}
            style={{ padding: isOpen ? "0px 0px" : "0px 10px" }}
            className={isOpen ? "mx-4" : "mx-0"}
        />
        <p
            style={{ display: isOpen ? "inline" : "none" }}
            className='m-0 p-0'>{name}</p>
    </NavLink>) : (<Fragment></Fragment>)

}

export default Links
