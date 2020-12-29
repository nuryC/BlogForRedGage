import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardContent, IonTextarea, IonButton, IonItemDivider, 
  IonLabel, IonButtons, IonBackButton } from '@ionic/react';
import Post from '../components/Post';
import Comments from '../components/Comments';
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import './DetailPost.css';

const DetailPost: React.FC = () => {
    const { handleSubmit, control, errors } = useForm();
  
    /**
     *
     * @param data
     */
    const onSubmit = (data: any) => {
      console.log(JSON.stringify(data, null, 2));
    };
    
    const formFields: InputProps[] = [
      {
        name: "username",
        label: "Username",
      },
      {
        name: "comment",
        label: "Body",
        component: <IonTextarea clearOnEdit={false} />
      }
    ];
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Detail Post </IonTitle>
            
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <Post title="Titulo" userName="Nury" content="Aqui esta el contenido de la noticia" timestamp="Viernes 25/12/2020" />

        <IonItemDivider></IonItemDivider>

        <IonCard className="commentCard"> 

            <IonCardContent>
                <IonItemDivider>
                    <IonLabel>
                        <p >Make a comment</p>
                    </IonLabel>
                </IonItemDivider>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {formFields.map((field, index) => (
                        <Input {...field} control={control} key={index} errors={errors} />
                    ))}
                    <IonButton expand="block" type="submit" className="ion-margin-top" >
                        Comment
                    </IonButton>
                </form>
            </IonCardContent>

        </IonCard>

        <IonCard className="commentCard">

            <IonCardHeader color="light">
                <p className="commentTitle">Comments</p>
            </IonCardHeader>
            <IonCardContent>
                <Comments userName="Nury" comment="Este es el comentario" />
            </IonCardContent>

        </IonCard>
        
      </IonContent>

    </IonPage>
  );
};

export default DetailPost;
