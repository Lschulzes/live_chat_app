import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;

  aside {
    flex: 7;

    background-image: ${(props) =>
      `linear-gradient(-90deg, ${props.theme.secondary.bg_light},${props.theme.secondary.bg})`};
    color: ${(props) => props.theme.secondary.color};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8rem 6rem;

    img {
      max-width: 18rem;
    }
    strong {
      font: 700 2rem 'Poppins', sans-serif;
      line-height: 3rem;
      margin-top: 1rem;
    }

    p {
      font-size: 1.2rem;
      line-height: 2rem;
      margin-top: 1rem;
      color: ${(props) => props.theme.secondary.color_p};
    }
  }

  main {
    flex: 8;
    padding: 0 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    .main-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 18rem;
      align-items: stretch;
      text-align: center;

      .logout_btn {
        top: 0.5rem;
        left: 1rem;
        position: absolute;
      }

      > img {
        align-self: center;
      }

      h2 {
        font-size: 1.5rem;
        margin: 4rem 0 1.5rem;
        font-family: 'Poppins', sans-serif;
      }

      form {
        input {
          height: 3rem;
          border-radius: 8px;
          padding: 0 1rem;
          background: ${(props) => props.theme.primary.bg};
          border: 1px solid #a8a8b3;
          outline: none;
          color: ${(props) => props.theme.primary.color};
        }

        button {
          margin-top: 1rem;
        }

        button,
        input {
          width: 100%;
        }
      }

      .create-room {
        margin-top: 4rem;
        height: 3rem;
        border-radius: 8px;
        font-weight: 500;
        background: #ea4335;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 0;
        transition: filter 300ms;

        img {
          margin-right: 0.5rem;
        }

        &:hover {
          filter: brightness(0.9);
        }
      }

      .separator {
        font-size: 0.9rem;
        color: #a8a8b3;
        margin: 2rem 0;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          flex: 1;
          height: 1px;
          background-color: #a8a8b3;
          margin-right: 1rem;
        }
        &::after {
          content: '';
          flex: 1;
          height: 1px;
          background-color: #a8a8b3;
          margin-left: 1rem;
        }
      }

      p {
        font-size: 0.85rem;
        color: ${(props) => props.theme.primary.color};
        margin-top: 1rem;

        a {
          color: ${() => '#e559f9'};
        }
      }
    }
  }
`;
