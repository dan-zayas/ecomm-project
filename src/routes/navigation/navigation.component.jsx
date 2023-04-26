import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as Logo } from '../../assets/dinosaur.svg';
import { signOutUser } from "../../utils/firebase/firebase.utils";

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles.jsx'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <>
      <NavigationContainer>
          <LogoContainer to='/'>
              <Logo className='logo' />
          </LogoContainer>
          <NavLinks>
            <NavLink to="/shop">
              Shop
            </NavLink>
            {currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                Sign Out
              </NavLink>
            ) : (
              <NavLink to='/auth'>
                Sign In
              </NavLink>
            )}
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

  export default Navigation;