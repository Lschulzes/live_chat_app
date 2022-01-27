import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../services/firebase";
import { RootState } from "../store";

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
  const [title, setTitle] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const roomRef = db.ref(`room/${roomCode}`);
    roomRef.on("value", (room) => {
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
              ([_, val]) => val.authorId === user?.uid
            )?.[0],
          };
        });
      }

      questionsArray.sort((a: QuestionType, b: QuestionType) => {
        const areEqual = a.likeCount === b.likeCount;
        const isBBigger = b.likeCount - a.likeCount > 0 ? 1 : -1;
        return (areEqual && -1) || isBBigger;
      });

      setQuestions(questionsArray);

      setTitle(title);

      return () => {
        roomRef.off("value");
      };
    });
  }, [roomCode, user?.uid]);

  return [questions, title];
};

export default useRoom;
