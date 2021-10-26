import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import React, { useContext } from 'react';
import AuthDiv from '../styles/AuthDiv';
import { ThemeContext } from 'styled-components';
import ReactSwitch from 'react-switch';
import Button from '../components/UI/Button';

interface Props {
  toggleTheme: () => void;
}

const Home: React.FC<Props> = (props) => {
  const themeCtx = useContext(ThemeContext);
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
          <img src={logoImg} alt='Logo' />
          <button className='create-room'>
            <img src={googleIconImg} alt='Logo do Google' />
            Create Your Room With Google
          </button>
          <div className='separator'>or join a room</div>
          <form>
            <input type='text' placeholder='Type the room code' />
            <Button type='submit'>Join Room</Button>
          </form>
        </div>
      </main>
    </AuthDiv>
  );
};

export default Home;
