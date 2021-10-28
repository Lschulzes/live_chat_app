import { FormEvent, useRef } from 'react';
import logoImg from '../assets/images/logo.svg';
import Button from '../components/UI/Button';
import RoomCode from '../components/RoomCode/RoomCode';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { useHistory, useParams } from 'react-router';
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
  const history = useHistory();

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Delete question?')) {
      await db.ref(`room/${roomCode}/questions/${questionId}`).remove();
    }
  };
  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await db.ref(`room/${roomCode}/questions/${questionId}`).update({
      isAnswered: true,
    });
  };
  const handleHighlightQuestion = async (questionId: string) => {
    await db.ref(`room/${roomCode}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };

  const handleEndRoom = async () => {
    if (window.confirm('Delete room?')) {
      const questionRef = await db.ref(`room/${roomCode}`).update({
        endedAt: new Date(),
      });
      history.push('/');
    }
  };

  return (
    <RoomPageDiv>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Live Chat Logo' />
          <div>
            <RoomCode code={roomCode} />
            <Button isOutlined onClick={handleEndRoom}>
              Close Room
            </Button>
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              <button
                type='button'
                onClick={() =>
                  handleCheckQuestionAsAnswered(question.questionId)
                }
              >
                <img src={checkImg} alt='Check question as answered' />
              </button>
              <button
                type='button'
                onClick={() => handleHighlightQuestion(question.questionId)}
              >
                <img src={answerImg} alt='Highlights question' />
              </button>
              <button
                type='button'
                onClick={() => handleDeleteQuestion(question.questionId)}
              >
                <img src={deleteImg} alt='delete question' />
              </button>
            </Question>
          ))}
        </ul>
      </main>
    </RoomPageDiv>
  );
}
