import styled from 'styled-components';
const QuestionLi = styled.li`
  background-color: #222;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  list-style: none;

  & + & {
    margin-top: 0.5rem;
  }

  p {
    color: #eee;
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

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
        color: #737380;
        font-size: 0.85rem;
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
};

export default function Question({ content, author }: QuestionProps) {
  return (
    <QuestionLi>
      <p>{content}</p>
      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
      </footer>
    </QuestionLi>
  );
}
