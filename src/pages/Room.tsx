import { FormEvent, useEffect, useRef, useState } from 'react';
import logoImg from '../assets/images/logo.svg';
import Button from '../components/UI/Button/Button';
import RoomCode from '../components/RoomCode/RoomCode';
import { useHistory, useParams } from 'react-router';
import { RoomPageDiv } from '../styles/RoomPageDiv';
import { db } from '../services/firebase';
import Logout from '../components/UserActions/UserActions';
import Question from '../components/question/Question';
import useRoom from '../hooks/useRoom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { handleLoginUser } from '../store/slices/auth/actions';
import { Link } from 'react-router-dom';
import { UIActions } from '../store/slices/UI/UISlice';

type RoomCodeType = {
  id: string;
};

export default function Room() {
  const { id: roomCode } = useParams<RoomCodeType>();
  const authState = useSelector((state: RootState) => state.auth);
  const { user, isLoggedIn } = authState;
  const dispatch = useDispatch();
  const history = useHistory();
  const questionTextRef = useRef<HTMLTextAreaElement>(null);
  const [questions, title] = useRoom(roomCode);
  const handleCreateQuestion = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    const questionText = questionTextRef.current?.value;
    const questionLength = questionText?.trim().length;
    if (!questionLength) return;
    if (questionLength > 1000) return;
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
    dispatch(UIActions.setSuccess({ msg: 'Question sent successfully!' }));
    setTimeout(() => {
      dispatch(UIActions.clearSuccess());
    }, 3000);
  };

  const handleLikeQuestion = async (questionId: string, likeId: string) => {
    if (!isLoggedIn) return;
    if (likeId) {
      db.ref(
        `room/${roomCode}/questions/${questionId}/likes/${likeId}`
      ).remove();
      return;
    }
    db.ref(`room/${roomCode}/questions/${questionId}/likes`).push({
      authorId: user.uid,
    });
  };

  const redirectToHome = () => history.push('/');

  useEffect(() => {
    if (!isLoggedIn) return;
    if (roomCode in user.my_rooms) history.push(`/admin/room/${roomCode}`);
  }, []);

  return (
    <RoomPageDiv>
      <header>
        <div className='content'>
          <img src={logoImg} alt='Live Chat Logo' onClick={redirectToHome} />

          <RoomCode code={roomCode} />
        </div>
      </header>
      <main className='content'>
        <div className='room-title'>
          <h1>{title}</h1>
          <span>
            {questions.length} Question{questions.length === 1 ? '' : 's'}
          </span>
        </div>
        <form onSubmit={handleCreateQuestion}>
          <textarea
            placeholder='What do you want to ask?'
            ref={questionTextRef}
            maxLength={1000}
          />
          <div className='form-footer'>
            {isLoggedIn ? (
              <Logout user={user} />
            ) : (
              <span>
                <button onClick={() => dispatch(handleLoginUser(authState))}>
                  Login
                </button>
                &nbsp; to send a question
              </span>
            )}
            <Button type='submit' disabled={!isLoggedIn}>
              Send Question
            </Button>
          </div>
        </form>
        <ul className='question-list'>
          {questions.map((question) => (
            <Question
              key={question.questionId}
              author={question.author}
              content={question.content}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <button
                  className={'like-btn ' + `${question.likeId ? 'liked' : ''}`}
                  type='button'
                  aria-label='Like Button'
                  onClick={() =>
                    handleLikeQuestion(question.questionId, question.likeId)
                  }
                >
                  <span>{question.likeCount > 0 && question.likeCount}</span>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z'
                      stroke='#737380'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              )}
            </Question>
          ))}
        </ul>
      </main>
    </RoomPageDiv>
  );
}
