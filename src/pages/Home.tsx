import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardContent, IonTextarea, IonButton } from '@ionic/react';
import BlogEntrance from '../components/BlogEntrance';
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import './Home.css';

const Home: React.FC = () => {
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
      name: "titlePost",
      label: "Title",
    },
    {
      name: "contentPost",
      component: <IonTextarea clearOnEdit={false} />,
      label: "Content"
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blog </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard color="light">          
          <IonCardHeader>
            New Post
          </IonCardHeader>
          <IonCardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
              {formFields.map((field, index) => (
                <Input {...field} control={control} key={index} errors={errors} />
              ))}
              <IonButton expand="block" type="submit" className="ion-margin-top" >
                Save
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>

        <BlogEntrance title="Titulo" userName="Nury" content="Aqui esta el contenido de la noticia" timestamp="Viernes 25/12/2020" coments={2} />        
      </IonContent>
    </IonPage>
  );
};

export default Home;
