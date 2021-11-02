import logoutImg from '../../assets/images/logout.svg';
import styled from 'styled-components';
import ToggleTheme from '../toggleTheme/ToggleTheme';
import { UserActionsDiv } from './UserActionsDiv';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/index';
import { handleLogout } from '../../store/slices/auth';
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
const LogoutImg = styled.img`
  width: 2rem;

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

export default function UserActions(_: LogoutProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const history = useHistory();

  const redirect = (path: string): void => history.push(path);

  return (
    <UserActionsDiv className='logout_btn'>
      <img
        src={user.avatar}
        alt={'User Avatar'}
        className='pic'
        referrerPolicy='no-referrer'
        style={{ background: '#000' }}
        onClick={() => redirect(`/user/${user.uid}`)}
      />
      <div className='plus'>
        <FaPlus />
      </div>
      <LogoutImg
        src={logoutImg}
        alt='logout'
        onClick={() => dispatch(handleLogout())}
        className='logout'
      />
      <ToggleTheme />
      <span className='username'>{user.username}</span>
    </UserActionsDiv>
  );
}
