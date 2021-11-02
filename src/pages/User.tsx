import logoImg from '../assets/images/logo.svg';
import { Route, useHistory } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { UserStyles } from '../styles/UserStyles';
import UserActions from '../components/UserActions/UserActions';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import FavoriteRoom from '../components/FavoriteRoom/FavoriteRoom';
import RoomCode from '../components/RoomCode/RoomCode';
import CheckoutStripe from '../components/CheckoutStripe/CheckoutStripe';

export default function User() {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push('/');
  }, [isLoggedIn]);

  return (
    <UserStyles>
      <header>
        <div className='content'>
          {' '}
          <UserActions user={user} />
          <Link to={'/'}>
            <img src={logoImg} alt='Live Chat Logo' />
          </Link>
        </div>
      </header>
      <section id='user-profile'>
        <aside>
          <ul>
            <NavLink to={`/user/${user.uid}/favorite`}>
              <li>Favorite Rooms</li>
            </NavLink>
            <NavLink to={`/user/${user.uid}/my-rooms`}>
              <li>My Rooms</li>
            </NavLink>
            <NavLink to={`/user/${user.uid}/buy`}>
              <li>Premium Likes</li>
            </NavLink>
          </ul>
        </aside>
        <main>
          <Route path={`/user/${user.uid}/favorite`}>
            <div className='favorite-rooms'>
              {typeof user.favorite_rooms !== 'undefined' ? (
                Object.entries(user.favorite_rooms).map(
                  ([code, title]: any) => (
                    <RoomCode key={code} code={code} title={title} />
                  )
                )
              ) : (
                <h2>No favorite Rooms Yet</h2>
              )}
            </div>
          </Route>
          <Route path={`/user/${user.uid}/my-rooms`}>
            <div className='user-rooms'>
              {typeof user.my_rooms !== 'undefined' ? (
                Object.entries(user.my_rooms).map(([code, title]: any) => (
                  <RoomCode key={code} code={code} title={title} />
                ))
              ) : (
                <h2>No room created yet!</h2>
              )}
            </div>
          </Route>
          <Route path={`/user/${user.uid}/buy`}>
            <div className='buy-likes'>
              <CheckoutStripe />
            </div>
          </Route>
          <Route path={`/user/${user.uid}`} exact>
            <div className='general-settings'>
              <h2>General Settings</h2>
            </div>
          </Route>
        </main>
      </section>
    </UserStyles>
  );
}
