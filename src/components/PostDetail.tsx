import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
import './PostDetail.css';

interface ContainerProps {
  id: number;
  userName: string;
  timestamp: string;
  content: string;
  title: string;
}

const PostDetail: React.FC<ContainerProps> = ({ 
  title, 
  id,
  userName, 
  timestamp, 
  content
}) => {
  return (
    <>
      <IonCard>
        <IonCardContent>
          <div className="container">
            <h1>{title}</h1>
            <strong>@{userName}</strong>
            <p> {timestamp} </p> <br/>
            <p> {content} </p>
          </div> 
        </IonCardContent>
      </IonCard>        
    </>    
  );
};

export default PostDetail;
