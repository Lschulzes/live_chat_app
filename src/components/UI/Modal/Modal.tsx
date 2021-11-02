import ReactModal from 'react-modal';
import styled from 'styled-components';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { UIActions } from '../../../store/slices/UI/UISlice';
const ModalDiv = styled.div`
  z-index: 50;
  ${(props) =>
    `background-image: linear-gradient(45deg,${props.theme.primary.bg} ,${props.theme.primary.bg_darker}) `};
  color: ${(props) => props.theme.primary.color};
  margin: 0 1rem;
  max-width: 30rem;
  border-radius: 10px;
  -webkit-animation: slide-in-top 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
  animation: slide-in-top 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

  .modal-header {
    border-bottom: solid 1px #aaa;
    padding: 0.75rem;
    display: flex;
    justify-content: center;
  }
  .modal-body {
    padding: 1.5rem 2.5rem;

    p {
      padding: 1rem 0 0 0;
    }
  }
  .modal-footer {
    display: flex;
    padding: 0.75rem;
    gap: 1rem;
    justify-content: flex-end;
  }

  @-webkit-keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-1000px);
      transform: translateY(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-1000px);
      transform: translateY(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
const OverlayDiv = styled.div`
  background: #000000aa;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  overflow: hidden;
  animation: opacity 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) forwards;

  @keyframes opacity {
    0% {
      filter: opacity(0);
    }
    100% {
      filter: opacity(1);
    }
  }
`;

export default function Modal() {
  const { heading, text, action, title } = useSelector(
    (state: RootState) => state.UI.modal
  );
  const isOpen = useSelector((state: RootState) => state.UI.isModalOpen);
  const dispatch = useDispatch();
  const toggle = () => dispatch(UIActions.toggleModal());
  const dispatchAction = () => {
    dispatch(UIActions.setTrigger({ on: true }));
    toggle();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={toggle}
      preventScroll={true}
      className='_'
      overlayClassName='_'
      contentElement={(props, children) => (
        <ModalDiv {...props}>{children}</ModalDiv>
      )}
      overlayElement={(props, contentElement) => (
        <OverlayDiv {...props}>{contentElement}</OverlayDiv>
      )}
      shouldFocusAfterRender
    >
      <div className='modal-header'>
        <h3>{title}</h3>
      </div>
      <div className='modal-body'>
        <h2>{heading}</h2>
        <p>{text}</p>
      </div>
      <div className='modal-footer'>
        <Button onClick={toggle} isOutlined>
          Cancel
        </Button>
        <Button onClick={dispatchAction}>{action}</Button>
      </div>
    </ReactModal>
  );
}
