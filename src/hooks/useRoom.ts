import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import useAuth from './useAuth';

type QuestionType = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  questionId?: any;
  likes?: Record<string, { authorId: string }>;
  likeCount: number;
  likeId: string;
};

type RoomData = {
  authorId: string;
  questions: { questionId: QuestionType };
  title: string;
};

const useRoom = (roomCode: string): [QuestionType[], string] => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState<string>('');
  const { user } = useAuth();
  useEffect(() => {
    const roomRef = db.ref(`room/${roomCode}`);

    roomRef.on('value', (room) => {
      const { questions, title } = room.val() as RoomData;
      let questionsArray: any[] = [];
      if (questions) {
        questionsArray = Object.entries(questions).map(([key, val]) => {
          val.questionId = key;
          return {
            questionId: key,
            content: val.content,
            author: val.author,
            isHighlighted: val.isHighlighted,
            isAnswered: val.isAnswered,
            likeCount: Object.values(val.likes ?? {}).length,
            likeId: Object.entries(val.likes ?? {}).find(
              ([key, val]) => val.authorId === user?.uid
            )?.[0],
          };
        });
      }
      setQuestions(questionsArray as QuestionType[]);

      setTitle(title);

      return () => {
        roomRef.off('value');
      };
    });
  }, [roomCode, user?.uid]);

  return [questions, title];
};

export default useRoom;
