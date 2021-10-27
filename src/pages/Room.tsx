import React, { FormEvent, useContext, useRef, useState } from 'react';
import logoImg from '../assets/images/logo.svg';
import Button from '../components/UI/Button';
import RoomCode from '../components/RoomCode/RoomCode';
import { useParams } from 'react-router';
import { RoomPageDiv } from '../styles/RoomPageDiv';
import useAuth from '../hooks/useAuth';
import { db } from '../services/firebase';
import Logout from '../components/logout/Logout';
import ToggleTheme from '../components/toggleTheme/ToggleTheme';
import { ThemeContext } from 'styled-components';

type RoomCodeType = {
  id: string;
};
export default function Room() {
  const { id: roomCode } = useParams<RoomCodeType>();
  const { user, handleLoginUser } = useAuth();
  const [newQuestion, setNewQuestion] = useState('');
  const themeCtx = useContext(ThemeContext);
  const questionTextRef = useRef<HTMLTextAreaElement>(null);
  const handleCreateQuestion = async (e: FormEvent) => {
    e.preventDefault();

    const questionText = questionTextRef.current?.value;
    if (!questionText?.trim().length) return;
    if (!user) throw new Error('Needs to be logged in to send questions');
    setNewQuestion(questionText);
    const question = {
      content: newQuestion,
      author: {
        name: user.username,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await db.ref(`room/${roomCode}/questions`).push(question);
    questionTextRef.current!.value = '';
  };
  return (
    <RoomPageDiv>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Live Chat Logo' />
          <RoomCode code={roomCode} />
        </div>
      </header>
      <main className='content'>
        <div className='room-title'>
          <h1>Room Name</h1>
          <span>4 Questions</span>
        </div>
        <form onSubmit={handleCreateQuestion}>
          <textarea
            placeholder='What do you want to ask?'
            ref={questionTextRef}
          />
          <div className='form-footer'>
            {user ? (
              <Logout user={user} />
            ) : (
              <span>
                <button onClick={handleLoginUser}>Login</button> to send a
                question
              </span>
            )}
            <Button type='submit' disabled={!user}>
              Send Question
            </Button>
          </div>
        </form>
      </main>
    </RoomPageDiv>
  );
}
