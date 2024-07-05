import React from "react";
import "./VideoModal.css";

const VideoModal = ({ isOpen, close, videoUrl, title, description }) => {
  if (!isOpen) return null;
  return (
    <div className="video-modal">
      <div className="video-modal-content">
        <span className="video-modal-close" onClick={close}>
          &times;
        </span>
        <h3>{title}</h3>
        <video controls src={videoUrl}>
          Your browser does not support the video tag.
        </video>
        <div className="video-modal-description">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
