import React, { useRef, useState } from 'react';
import logoImg from '../assets/images/logo.svg';
import styled from 'styled-components';
import Button from '../components/UI/Button';
import RoomCode from '../components/RoomCode/RoomCode';
import { useParams } from 'react-router';
const RoomPageDiv = styled.div`
  header {
    padding: 1.5rem;

    ${(props) =>
      'border-bottom: 1px solid' +
      (props.theme.title === 'light' ? '#e2e2e2' : '#666')};

    .content {
      max-width: 70rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > img {
        max-height: 3rem;
      }
    }
  }

  main {
    max-width: 50rem;
    margin: 0 auto;

    .room-title {
      margin: 2rem 0 1.5rem;
      display: flex;
      align-items: center;

      h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
        color: ${(props) => props.theme.primary.color};
      }

      span {
        margin-left: 1rem;
        background-color: ${(props) => props.theme.primary.item_color};
        border-radius: 999px;
        padding: 0.5rem 1rem;
        color: #fff;
        font-weight: 500;
        font-size: 0.85rem;
      }
    }
    form {
      textarea {
        width: 100%;
        border: 0;
        padding: 1rem;
        border-radius: 8px;
        background-color: ${(props) => props.theme.primary.bg_light};
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
        resize: vertical;
        min-height: 8rem;
      }

      .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;

        span {
          font-size: 0.85rem;
          color: #bbb;
          font-weight: 500;

          button {
            background: transparent;
            border: none;
            color: ${({ theme }) =>
              theme.title === 'light' ? theme.primary.item_color : '#EEE'};
            text-decoration: underline;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

type RoomCodeType = {
  id: string;
};
export default function Room() {
  const { id: roomCode } = useParams<RoomCodeType>();
  const [newQuestion, setNewQuestion] = useState('');
  const questionTextRef = useRef<HTMLTextAreaElement>(null);
  const handleCreateQuestion = async () => {
    const questionText = questionTextRef.current?.value;
    if (!questionText?.trim().length) return;
    setNewQuestion(questionText);
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
        <form>
          <textarea
            placeholder='What do you want to ask?'
            ref={questionTextRef}
          />
          <div className='form-footer'>
            <span>
              <button>Login</button> to send a question
            </span>
            <Button type='submit'>Send Question</Button>
          </div>
        </form>
      </main>
    </RoomPageDiv>
  );
}
