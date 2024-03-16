import React from "react";

interface PopupProps {
  onClose?: () => void;
  children: React.ReactNode;
}

const Gamepopup: React.FC<PopupProps> = ({ onClose, children }) => {
  const handlePopupClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="z-[99] fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
      onClick={onClose}>
      <div className={`px-4 rounded-3xl`} onClick={handlePopupClick}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Gamepopup;
