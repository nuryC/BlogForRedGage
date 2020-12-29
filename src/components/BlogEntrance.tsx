import React from 'react';
import { IonCard, IonCardContent, IonRow, IonCol } from '@ionic/react';
import './BlogEntrance.css';

interface ContainerProps {
  userName: string;
  timestamp: string;
  content: string;
  title: string;
  coments: number;
}

const BlogEntrance: React.FC<ContainerProps> = ({ 
  title, 
  userName, 
  timestamp, 
  content,
  coments 
}) => {
  return (
    <>
      <IonCard color="medium">
        <IonCardContent>
          <div className="containerEntrance">
            <h1>{title}</h1>
            <strong>@{userName}</strong>
            <p> {timestamp} </p> <br/>
            <p> {content} </p>
          </div>
          <IonRow class="cardfooter">
            <IonCol>
              <p>{coments} coments </p>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard> 
    </>    
  );
};

export default BlogEntrance;
