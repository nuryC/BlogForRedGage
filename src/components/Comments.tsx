import React from 'react';
import { IonItem } from '@ionic/react';
import './Comments.css';

interface ContainerProps {
  userName: string;
  comment: string;
}

const Comments: React.FC<ContainerProps> = ({ 
  userName,
  comment
}) => {
  return (
    <>
      <IonItem>
          <div className="contendComment">
              <strong>{userName}</strong>  <br/>
              <p>{comment}</p> 
          </div>
      </IonItem>
    </>    
  );
};

export default Comments;
