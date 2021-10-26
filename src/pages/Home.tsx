import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import React, { useContext, useEffect } from 'react';
import AuthDiv from '../styles/AuthDiv';
import { ThemeContext } from 'styled-components';
import ReactSwitch from 'react-switch';
import Button from '../components/UI/Button';
import { Route, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/authContext';
import Logout from '../components/logout/Logout';
interface Props {
  toggleTheme: () => void;
}

const Home: React.FC<Props> = (props) => {
  const history = useHistory();
  const themeCtx = useContext(ThemeContext);
  const authCtx = useContext(AuthContext);
  const handleCreateRoom = async () => {
    const logged = await authCtx.handleLoginUser();
    if (!logged) return;
    history.push('/new-room');
  };

  return (
    <AuthDiv>
      <aside>
        <img src={illustrationImg} alt='Q&A illustration' />
        <strong>Create Q&amp;A Live Rooms</strong>
        <p>
          {'answer the most in demand questions of your live audience'
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </p>
      </aside>
      <main>
        <div className='main-content'>
          <div style={{ top: '0.5rem', right: '0.5rem', position: 'absolute' }}>
            <ReactSwitch
              checked={themeCtx.title === 'dark'}
              onChange={props.toggleTheme}
              checkedIcon={false}
              uncheckedIcon={false}
              height={10}
              width={30}
              handleDiameter={17}
              offColor={themeCtx.primary.color}
              onColor={themeCtx.secondary.bg}
              onHandleColor='#eee'
              offHandleColor='#eee'
              boxShadow='-2px 0 5px #000'
            />
          </div>
          {authCtx.isLoggedIn && <Logout avatar={authCtx.user.avatar} />}
          <img src={logoImg} alt='Logo' />
          <Route path='/new-room'>
            <h2>Create a new room </h2>
            <form>
              <input type='text' placeholder='Room Name' />
              <Button type='submit'>Create Room</Button>
            </form>
            <p>
              Join an existing room? <Link to='/'>Click Here</Link>
            </p>
          </Route>
          <Route path='/' exact>
            <button className='create-room' onClick={handleCreateRoom}>
              <img src={googleIconImg} alt='Logo do Google' />
              Create Your Room With Google
            </button>
            <div className='separator'>or join a room</div>
            <form>
              <input type='text' placeholder='Type the room code' />
              <Button type='submit'>Join Room</Button>
            </form>
          </Route>
        </div>
      </main>
    </AuthDiv>
  );
};

export default Home;
