import { useEffect, useState } from 'react';
import { db } from '../services/firebase';

type QuestionType = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  questionId?: any;
};

type RoomData = {
  authorId: string;
  questions: { questionId: QuestionType };
  title: string;
};

const useRoom = (roomCode: string): [QuestionType[], string] => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const roomRef = db.ref(`room/${roomCode}`);

    roomRef.on('value', (room) => {
      const { questions, title } = room.val() as RoomData;
      const questionsArray = Object.entries(questions).map(([key, val]) => {
        val.questionId = key;
        return val;
      });
      setQuestions(questionsArray as QuestionType[]);

      setTitle(title);
    });
  }, [roomCode]);

  return [questions, title];
};

export default useRoom;
