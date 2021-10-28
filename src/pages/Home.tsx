import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import React, { FormEvent, useContext, useRef } from 'react';
import AuthDiv from '../styles/AuthDiv';
import { ThemeContext } from 'styled-components';
import ReactSwitch from 'react-switch';
import Button from '../components/UI/Button';
import { Route, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Logout from '../components/logout/Logout';
import useAuth from '../hooks/useAuth';
import { db } from '../services/firebase';
import ToggleTheme from '../components/toggleTheme/ToggleTheme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { handleLoginUser } from '../store/slices/auth/actions';

type RoomType = {
  authorId: string;
  endedAt: string;
  title: string;
};

const Home: React.FC = () => {
  const roomNameRef = useRef<HTMLInputElement>(null);
  const roomCodeRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const handleCreateRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roomName = roomNameRef.current!.value;
    if (!roomName.trim().length) return;

    const dbRoomRef = await db.ref('/room').push({
      title: roomName,
      authorId: authState.user.uid,
    });

    history.push(`/admin/room/${dbRoomRef.key}`);
  };
  const handleNewRoom = async () => {
    const logged = await dispatch(handleLoginUser(authState));
    if (!logged) return;
    history.push('/new-room');
  };

  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault();
    const roomCode = roomCodeRef.current?.value;
    if (!roomCode?.trim().length) return;
    const dbRoom = await db.ref(`/room/${roomCode}`).get();
    if (!dbRoom.exists()) return;
    const room: RoomType = await dbRoom.val();
    if (room?.endedAt) return;
    if (room.authorId === authState.user.uid) {
      history.push(`/admin/room/${roomCode}`);
      return;
    }
    history.push(`/room/${roomCode}`);
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
          {authState.isLoggedIn && <Logout user={authState.user} />}
          {!authState.isLoggedIn && (
            <div
              style={{ top: '0.5rem', left: '0.25rem', position: 'absolute' }}
            >
              <ToggleTheme />
            </div>
          )}
          <img src={logoImg} alt='Logo' />
          <Route path='/new-room'>
            <h2>Create a new room </h2>
            <form onSubmit={handleCreateRoom}>
              <input type='text' placeholder='Room Name' ref={roomNameRef} />
              <Button type='submit'>Create Room</Button>
            </form>
            <p>
              Join an existing room? <Link to='/'>Click Here</Link>
            </p>
          </Route>
          <Route path='/' exact>
            <button className='create-room' onClick={handleNewRoom}>
              <img src={googleIconImg} alt='Logo do Google' />
              Create Your Room With Google
            </button>
            <div className='separator'>or join a room</div>
            <form onSubmit={handleJoinRoom}>
              <input
                type='text'
                placeholder='Type the room code'
                ref={roomCodeRef}
              />
              <Button type='submit'>Join Room</Button>
            </form>
          </Route>
        </div>
      </main>
    </AuthDiv>
  );
};

export default Home;
