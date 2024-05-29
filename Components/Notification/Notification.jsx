import React from "react";

import style from "./Notification.module.css";

const Notification = ({ notification, setNotification }) => {
  return (
    <div className={style.alert} onClick={() => setNotification("")}>
      {notification}
      <span>&times;</span>
    </div>
  );
};

export default Notification;
