import React from 'react';
import { IonItem, IonList } from '@ionic/react';
import './Comments.css';

interface ContainerProps {
  userName: string;
  comment: string;
  id: number;
}

const Comments: React.FC<ContainerProps> = ({ 
  userName,
  comment,
  id
}) => {
  return (
    <>
      <IonList>
        <IonItem>
          <div className="contendComment">
            <strong>{userName}</strong>  <br/>
            <p>{comment}</p> 
          </div>
        </IonItem>      
      </IonList>
    </>    
  );
};

export default Comments;
