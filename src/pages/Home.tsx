import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardContent, IonTextarea, IonButton, IonSpinner, IonToast } from '@ionic/react';
import ListEntrance from '../components/ListEntrance';
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import {getPosts, createPosts} from '../services/api';
import {Posts} from '../staticData/posts';
import { Link, RouteComponentProps } from 'react-router-dom';
import './Home.css';

const Home: React.FC<RouteComponentProps> = ({history}) => {
  const { handleSubmit, control, errors } = useForm();
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const formFields: InputProps[] = [
    {
      name: "username",
      label: "Username",
    },
    {
      name: "title",
      label: "Title",
    },
    {
      name: "body",
      component: <IonTextarea />,
      label: "Content"
    },
  ];

  /**
   * Create new post
   * @param data 
   */
  const onSubmit = (data: any,e) => {
    data.createdAt= new Date();
    data.comments = [];
    let a = Posts.length;
    data.id = a + 1;
    const info = JSON.stringify(data, null, 2);
    setLoading(true)
    
    Posts.push({
      "username": data.username,
      "title": data.title,
      "body": data.body,
      "createdAt": (new Date()).toUTCString(),
      "comments": [],
      "id": data.id
    });

    setTimeout(() => {
      e.target.reset();
      setLoading(false);
      setShowToast(true);
    }, 1000);
  };
  
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
            <p className="commentTitle">New Post</p>
          </IonCardHeader>
          <IonCardContent>
            <form id="FormPost" onSubmit={handleSubmit(onSubmit)}>
              {formFields.map((field, index) => (
                <Input {...field} control={control} key={index} errors={errors} />
              ))}
              <IonButton expand="block" type="submit" className="ion-margin-top" >
                Save
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>

        {(loading) && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
          </div>
        )}
        
        {Posts.map((post,index) => (
          <IonCard color="medium" onClick={e => {
            e.preventDefault();
            localStorage.setItem('post',JSON.stringify(post))
            history.push({
              pathname: '/Detail/'+post.id
            })
          }}>
            <ListEntrance key={index} id={post.id} title={post.title} userName={post.username} content={post.body} timestamp={post.createdAt} coments={post.comments.length} />
          </IonCard>
          
        ))}

        {(showToast) && (
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Your post have been saved."
            duration={2000}
            color="success"
          />
        )}
      
      </IonContent>
    </IonPage>
  );
};

export default Home;
