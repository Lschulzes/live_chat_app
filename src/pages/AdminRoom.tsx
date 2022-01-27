import { useEffect } from "react";
import logoImg from "../assets/images/logo.svg";
import Button from "../components/UI/Button/Button";
import RoomCode from "../components/RoomCode/RoomCode";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import { useHistory, useParams } from "react-router";
import { RoomPageDiv } from "../styles/RoomPageDiv";
import { db } from "../services/firebase";
import Logout from "../components/UserActions/UserActions";
import Question from "../components/question/Question";
import useRoom from "../hooks/useRoom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { UIActions } from "../store/slices/UI/UISlice";
import {
  addOrSubtractActiveQuestionsInARoom,
  toggleRoom,
} from "../store/slices/auth/actions";
import { UITypeActions } from "../store/helpers/enums";
import {
  CloseRoomFromDB,
  deleteQuestionFromDB,
} from "../store/helpers/functions";

type RoomCodeType = {
  id: string;
};

export default function AdminRoom() {
  const { id: roomCode } = useParams<RoomCodeType>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [questions, title] = useRoom(roomCode);
  const history = useHistory();
  const trigger = useSelector((state: RootState) => state.UI.trigger);
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      if (!trigger.on) return;
      if (trigger.type === UITypeActions.DELETE_QUESTION) {
        dispatch(
          deleteQuestionFromDB(authState, {
            payload: { questionId: trigger.data.questionId, roomId: roomCode },
            type: "",
          })
        );
      }
      if (trigger.type === UITypeActions.CLOSE_ROOM) {
        dispatch(
          CloseRoomFromDB(authState, {
            payload: { roomId: roomCode },
            type: "",
          })
        );
        history.push("/");
      }
      dispatch(UIActions.cleanTrigger());
    })();
    return () => controller?.abort();
  }, [trigger]);

  const handleDeleteQuestion = async (questionId: string) => {
    dispatch(UIActions.toggleModal());
    dispatch(
      UIActions.setModal({
        heading: "Are you sure to delete the question?",
        title: `${title}`,
        action: "Delete",
        text: "",
      })
    );
    dispatch(
      UIActions.setTrigger({
        data: { questionId },
        type: UITypeActions.DELETE_QUESTION,
        on: false,
      })
    );
  };

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    const question: { isAnswered: boolean; author: { uid: string } } = (
      await db.ref(`room/${roomCode}/questions/${questionId}`).get()
    ).val();
    await db.ref(`room/${roomCode}/questions/${questionId}`).update({
      isAnswered: !question.isAnswered,
    });
    dispatch(
      addOrSubtractActiveQuestionsInARoom(authState, {
        payload: {
          add: question.isAnswered,
          roomCode: roomCode,
          uid: question.author.uid,
          currentUser: false,
        },
        type: "",
      })
    );
  };

  const handleHighlightQuestion = async (questionId: string) => {
    const question: { isHighlighted: boolean } = (
      await db.ref(`room/${roomCode}/questions/${questionId}`).get()
    ).val();

    await db.ref(`room/${roomCode}/questions/${questionId}`).update({
      isHighlighted: !question.isHighlighted,
    });
  };

  const handleEndRoom = async () => {
    dispatch(UIActions.toggleModal());
    dispatch(
      UIActions.setModal({
        heading: "Are you sure to terminate the room?",
        title: `${title}`,
        action: "Confirm",
        text: "This can't be undone!",
      })
    );
    dispatch(
      UIActions.setTrigger({
        data: {},
        type: UITypeActions.CLOSE_ROOM,
        on: false,
      })
    );
  };

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      if (!isLoggedIn) return history.push("/");
      const room: any = await (await db.ref(`/room/${roomCode}`).get()).val();
      if (room.authorId === user.uid || !user.uid) return;
      history.push(`/`);
    })();

    return () => controller?.abort();
  }, [isLoggedIn]);
  const redirectToHome = () => history.push("/");
  return (
    <RoomPageDiv>
      <header>
        <div className="content admin-content">
          <img src={logoImg} alt="Live Chat Logo" onClick={redirectToHome} />
          <div>
            <RoomCode code={roomCode} />
            <Button isOutlined onClick={handleEndRoom}>
              Close Room
            </Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div
          className="room-title"
          style={{ alignItems: "flex-start", display: "flex" }}
        >
          <div className="title-count">
            <h1>{title}</h1>
            <div className="admin-info">
              <span>
                {questions.length} Question{questions.length === 1 ? "" : "s"}
              </span>
              <div className="logout-admin">
                <Logout user={user} />
              </div>
            </div>
          </div>
        </div>

        <ul className="question-list">
          {questions.map((question) => (
            <Question
              key={question.questionId}
              author={question.author}
              content={question.content}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              <button
                type="button"
                onClick={() =>
                  handleCheckQuestionAsAnswered(question.questionId)
                }
              >
                <img src={checkImg} alt="Check question as answered" />
              </button>
              <button
                type="button"
                onClick={() => handleHighlightQuestion(question.questionId)}
              >
                <img src={answerImg} alt="Highlights question" />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.questionId)}
              >
                <img src={deleteImg} alt="delete question" />
              </button>
            </Question>
          ))}
        </ul>
      </main>
    </RoomPageDiv>
  );
}
