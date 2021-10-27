import { FormEvent, useRef } from 'react';
import logoImg from '../assets/images/logo.svg';
import Button from '../components/UI/Button';
import RoomCode from '../components/RoomCode/RoomCode';
import { useParams } from 'react-router';
import { RoomPageDiv } from '../styles/RoomPageDiv';
import useAuth from '../hooks/useAuth';
import { db } from '../services/firebase';
import Logout from '../components/logout/Logout';
import Question from '../components/question/Question';
import useRoom from '../hooks/useRoom';

type RoomCodeType = {
  id: string;
};

export default function AdminRoom() {
  const { id: roomCode } = useParams<RoomCodeType>();
  const { user, handleLoginUser } = useAuth();
  const questionTextRef = useRef<HTMLTextAreaElement>(null);
  const [questions, title] = useRoom(roomCode);

  const handleCreateQuestion = async (e: FormEvent) => {
    e.preventDefault();

    const questionText = questionTextRef.current?.value;
    console.log(questionText);
    if (!questionText?.trim().length) return;
    if (!user) throw new Error('Needs to be logged in to send questions');
    const question = {
      content: questionText,
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
          <div>
            <RoomCode code={roomCode} />
            <Button isOutlined>Close Room</Button>
          </div>
        </div>
      </header>
      <main className='content'>
        <div
          className='room-title'
          style={{ alignItems: 'flex-start', display: 'flex' }}
        >
          <div style={{ alignItems: 'flex-center', display: 'flex' }}>
            <h1>Room {title}</h1>
            <span>
              {questions.length} Question{questions.length === 1 ? '' : 's'}
            </span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Logout user={user} />
          </div>
        </div>

        <ul className='question-list'>
          {questions.map((question) => (
            <Question
              key={question.questionId}
              author={question.author}
              content={question.content}
            />
          ))}
        </ul>
      </main>
    </RoomPageDiv>
  );
}
