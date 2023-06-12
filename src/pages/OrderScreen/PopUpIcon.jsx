import React, { useState } from 'react';

import WhatsAppIcon from "../../assets/images/chat/whatsappIcon.png";
import MessagerIcon from "../../assets/images/chat/MenssagerIcon.png";

const PlatformIcon = ({ platform, communication }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(communication)
      .then(() => {
        console.log('Texto copiado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao copiar texto:', error);
      });
  };

  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  return (
    <div
      className="platform-icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
    
      <img className="img-register-menssager"   onClick={handleCopy}
        src={
            platform === "WhatsApp" 
                ? WhatsAppIcon
                : platform === "Messenger"
                    ? MessagerIcon
                    : MessagerIcon
                    
        } 
    alt="Ícone da Plataforma" />

      {showPopup && (
        <div className="communication-popup">
          {communication}
        </div>
      )}
    </div>
  );
};

export default PlatformIcon;