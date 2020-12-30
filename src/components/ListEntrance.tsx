import React from 'react';
import { IonCard, IonCardContent, IonRow, IonCol } from '@ionic/react';
import './ListEntrance.css';

interface ContainerProps {
  id:string;
  userName: string;
  timestamp: string;
  content: string;
  title: string;
  coments: number;
}
const ListEntrance: React.FC<ContainerProps> = ({ 
  id,
  title, 
  userName, 
  timestamp, 
  content,
  coments 
}) => {
  return (
    <>
      <IonCardContent>
        <div className="containerEntrance">
          <h1>{title}</h1>
          <strong>{userName}</strong><br/>
          <span> {timestamp} </span> <br/><br/>
          <p> {content} </p>
        </div>
        <IonRow class="cardfooter">
          <IonCol>
            <p>{coments} comments </p>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </>    
  );
};

export default ListEntrance;
