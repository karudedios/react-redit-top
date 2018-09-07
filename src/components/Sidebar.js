import * as React from 'react';
import styled from 'styled-components';

type Props = {
  open?: bool,
  autoHide?: bool,
  className?: string,
  triggerClose?: Function,
  closeOnBackdropClick?: bool,
  children?: [React.Component],
};

const Backdrop = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(200, 200, 200, .25);
`;

export default function Sidebar({
  open,
  children,
  autoHide,
  className,
  triggerClose,
  closeOnBackdropClick,
}: Props) {
  const openClass = open && autoHide ? 'open' : '';
  const autoHideClass = autoHide ? 'auto-hide' : '';

  const emitClose = (from) => {
    if (from === 'backdrop') {
      if (closeOnBackdropClick) {
        triggerClose();
      }

      return;
    }

    triggerClose();
  };

  const renderBackdrop = () => {
    if (!autoHide || !open) return null;

    return (
      <Backdrop
        role="presentation"
        onClick={() => emitClose('backdrop')}
        onKeyPress={() => emitClose('backdrop')}
      />
    );
  };

  const finalClassName = `${className} ${openClass} ${autoHideClass}`.trim();

  return (
    <React.Fragment>
      { renderBackdrop() }

      <div className={finalClassName}>
        { children }
      </div>
    </React.Fragment>
  );
}

Sidebar.defaultProps = {
  open: false,
  children: [],
  className: '',
  autoHide: false,
  triggerClose: x => x,
  closeOnBackdropClick: true,
};
