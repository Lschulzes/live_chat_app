import { UITypeActions } from "./enums";
import { ReactNode } from "react";

export type SingleQuestion = {
  content: string;
  author: {
    name: string;
    avatar: string;
    uid: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
};

export type SingleRoom = {
  title: string;
  authorId: string;
  limit_questions: number;
  questions?: { questionId: SingleQuestion }[];
};

export type User = {
  uid: string;
  username: string;
  avatar: string;
  favorite_rooms: any;
  my_rooms: any;
  premium_likes: number;
  limit_rooms: number;
  active_questions: any;
};

export type AuthStateType = {
  isLoggedIn: boolean;
  user: User;
};

export type ModalProps = {
  children?: ReactNode;
  title: string;
  heading: string;
  text?: string;
  action?: string;
};

export type UIStateType = {
  isModalOpen: boolean;
  isLoading: boolean;
  error: { hasError: boolean; msg: string | null };
  success: { hasMsg: boolean; msg: string | null };
  modal: ModalProps;
  trigger: { on: boolean; type: UITypeActions | null; data: any };
};
