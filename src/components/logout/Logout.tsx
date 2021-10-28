import logoutImg from '../../assets/images/logout.svg';
import styled from 'styled-components';
import ToggleTheme from '../toggleTheme/ToggleTheme';
import { UserActions } from './UserActionsDiv';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index';
import { handleLogout } from '../../store/slices/auth';

const LogoutImg = styled.img`
  width: 2rem;
  /* background: ${(props) => props.theme.primary.color}; */
  ${(props) =>
    props.theme.title === 'dark' &&
    'filter: invert(100%) sepia(3%) saturate(1936%) hue-rotate(170deg) brightness(118%) contrast(87%);'}
  cursor: pointer;
`;

type LogoutProps = {
  user: {
    avatar: string;
    username: string;
  };
};

export default function Logout(_: LogoutProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <UserActions className='logout_btn'>
      <img
        src={user.avatar}
        alt={'User Avatar'}
        className='pic'
        referrerPolicy='no-referrer'
      />
      <LogoutImg
        src={logoutImg}
        alt='logout'
        onClick={() => dispatch(handleLogout())}
        className='logout'
      />
      <ToggleTheme />
      <span className='username'>{user.username}</span>
    </UserActions>
  );
}
