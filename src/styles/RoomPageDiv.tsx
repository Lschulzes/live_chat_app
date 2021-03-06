import styled from 'styled-components';
export const RoomPageDiv = styled.div`
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
        cursor: pointer;
      }

      > div {
        display: flex;
        align-items: center;
        gap: 1rem;

        button {
          max-height: 2.5rem;
        }
      }
    }
  }

  main {
    max-width: 50rem;
    margin: 0 auto;
    padding: 1rem;

    .room-title {
      margin: 2rem 0 1.5rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .title-count {
        display: flex;
        gap: 1rem;
        flex-direction: column;
        align-items: flex-start;
        .admin-info {
          display: flex;
          gap: 1rem;

          .logout-admin {
            transform: translateY(-0.35rem);
          }
        }
      }
      h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
        color: ${(props) => props.theme.primary.color};
        inline-size: 40rem;
        overflow-wrap: break-word;
      }

      span {
        background-color: ${(props) => props.theme.primary.item_color};
        border-radius: 999px;
        padding: 0.5rem 1rem;
        color: #fff;
        font-weight: 500;
        font-size: 0.85rem;
        max-height: 2.2rem;
      }

      .username {
        color: ${({ theme }) =>
          theme.title === 'light' ? theme.primary.bg : '#fff'} !important;
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
        color: ${(props) => props.theme.primary.color};
      }

      .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        padding-left: 0.75rem;

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

    .question-list {
      margin-top: 1.5rem;
    }

    ${({ theme }) =>
      theme.title === 'light' &&
      `.username {
      color: #333 !important;
    }`}
  }

  @media (max-width: 600px) {
    header {
      .content {
        > img {
          max-height: 2.3rem;
        }
      }
      .admin-content {
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;

        > * {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }
      }
    }
    .username {
      display: none;
    }
  }
  @media (max-width: 900px) {
    .room-title {
      h1 {
        inline-size: 65vw !important;
        overflow-wrap: break-word;
      }
    }
  }
`;
