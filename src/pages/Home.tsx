import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardContent, IonTextarea, IonButton, IonSpinner, IonToast } from '@ionic/react';
import ListEntrance from '../components/ListEntrance';
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import {getPosts, createPosts} from '../services/api';
import { Link, RouteComponentProps } from 'react-router-dom';
import './Home.css';

const Home: React.FC<RouteComponentProps> = ({history}) => {
  const { handleSubmit, control, errors } = useForm();
  const [showToast, setShowToast] = useState(false);

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
   * Get data of post 
   */
  const [posts, setPosts] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const fetchPosts = () => {
    setLoading(true);
    getPosts().then((response) => {
      if (response && response.data) {        
        setPosts(response.data);
      }
    },error => {
      console.log(JSON.stringify(error))
    } ).finally(() => {
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchPosts();
  }, [])

  /**
   * Create new post
   * @param data 
   */
  const onSubmit = (data: any) => {
    data.createdAt= new Date();
    data.comments = [];
    const info = JSON.stringify(data, null, 2);
    createPosts(info).then(res => {             
      fetchPosts();
      setShowToast(true);
    },error=> {             
      console.log(error)
    })
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
        
        {posts.map((post,index) => (
          <IonCard color="medium" onClick={e => {
            e.preventDefault();
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
