import { ReactChildren, ReactNode } from 'react';
import styled from 'styled-components';
import cx from 'classnames';

const QuestionLi = styled.li`
  background-color: ${(props) => props.theme.primary.bg_light};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  list-style: none;

  & + & {
    margin-top: 0.5rem;
  }

  /* p {
    color: ${(props) => props.theme.primary.color};
  } */

  &.highlighted {
    background: ${({ theme }) => theme.primary.bg};
    border: 1px solid ${({ theme }) => theme.primary.color};
  }

  &.answered {
    background: ${({ theme }) => theme.primary.bg_darker} !important;
    color: ${({ theme }) => theme.primary.color_weak} !important;
    border: none;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    > div {
      display: flex;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }

      span {
        margin-left: 0.5rem;
        color: ${(props) => props.theme.primary.color};
        font-size: 0.85rem;
      }
    }

    button {
      background: transparent;
      border: none;
      cursor: pointer;
      transition: filter 200ms;

      &.like-btn {
        display: flex;
        align-items: flex-end;
        color: ${({ theme }) => theme.primary.highlight};
        gap: 0.5rem;
        transition: filter 0.2s;

        &.liked {
          color: ${({ theme }) => theme.primary.highlight};

          svg path {
            stroke: ${({ theme }) => theme.primary.highlight};
          }
        }
      }

      &:hover {
        filter: brightness(1.5) !important;
      }
    }
  }
`;

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered: boolean;
  isHighlighted: boolean;
};

export default function Question({
  content,
  author,
  children,
  isAnswered,
  isHighlighted,
}: QuestionProps) {
  console.log(isAnswered);
  return (
    <QuestionLi
      className={cx({
        answered: isAnswered,
        highlighted: isHighlighted && !isAnswered,
      })}
    >
      <p>{content}</p>
      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </QuestionLi>
  );
}
