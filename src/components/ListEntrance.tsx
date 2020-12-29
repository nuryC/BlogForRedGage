import React from 'react';
import { IonCard, IonCardContent, IonRow, IonCol } from '@ionic/react';
import './ListEntrance.css';

interface ContainerProps {
  userName: string;
  timestamp: string;
  content: string;
  title: string;
  coments: number;
}

const ListEntrance: React.FC<ContainerProps> = ({ 
  title, 
  userName, 
  timestamp, 
  content,
  coments 
}) => {
  return (
    <>
      <IonCard href="/Detail" color="medium">
        <IonCardContent>
          <div className="containerEntrance">
            <h1>{title}</h1>
            <strong>{userName}</strong>
            <p> {timestamp} </p> <br/>
            <p> {content} </p>
          </div>
          <IonRow class="cardfooter">
            <IonCol>
              <p>{coments} comments </p>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard> 
    </>    
  );
};

export default ListEntrance;
