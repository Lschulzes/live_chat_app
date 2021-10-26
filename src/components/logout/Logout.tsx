import React, { useContext } from 'react';
import logoutImg from '../../assets/images/logout.svg';
import styled from 'styled-components';
import AuthContext from '../../contexts/authContext';
const LogoutImg = styled.img`
  width: 2rem;
  /* background: ${(props) => props.theme.primary.color}; */
  ${(props) =>
    props.theme.title === 'dark' &&
    'filter: invert(100%) sepia(3%) saturate(1936%) hue-rotate(170deg) brightness(118%) contrast(87%);'}
  cursor: pointer;
`;
const UserActions = styled.div`
  display: flex;
  .pic {
    width: 45px;
    border-radius: 45px;
    z-index: 10;
    transition: all 0.4s;
  }

  .logout {
    margin-left: -2rem;
    transition: all 0.3s;
    transition-delay: 300ms;
  }

  &:hover {
    .logout {
      margin-left: 1rem;
    }

    .pic {
      width: 65px;
      border-radius: 65px;
    }
  }
`;
type LogoutProps = { avatar: string };

export default function Logout(props: LogoutProps) {
  const { handleLogoutUser } = useContext(AuthContext);
  return (
    <UserActions className='logout_btn'>
      <img src={props.avatar} alt={'User Avatar'} className='pic' />
      <LogoutImg
        src={logoutImg}
        alt='logout'
        onClick={handleLogoutUser}
        className='logout'
      />
    </UserActions>
  );
}
