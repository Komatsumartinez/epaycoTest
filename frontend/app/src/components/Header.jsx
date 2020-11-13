import React from 'react'
import StyledHeader from '../styles/StyledHeader'
import {Link} from 'react-router-dom'






const Header = () => {
    return (
        <StyledHeader>
            <span><Link to="/">ePayco</Link></span>
            <ul>
                <li>
                    <Link to="/cliente">Cliente</Link>
                </li>
                <li>
                    <Link to="/billetera">Billetera</Link>
                </li>
            </ul>
        </StyledHeader>
    )
}
export default Header