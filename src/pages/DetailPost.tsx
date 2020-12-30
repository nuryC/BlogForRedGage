import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardContent, IonTextarea, IonButton, IonItemDivider, 
  IonLabel, IonButtons, IonBackButton, IonSpinner, IonToast } from '@ionic/react';
import Post from '../components/Post';
import Comments from '../components/Comments';
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import {getDetailPost, getComments, getPosts, createComment, editPost} from '../services/api';
import './DetailPost.css';
import { RouteComponentProps } from 'react-router';
interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> {}

const DetailPost: React.FC<UserDetailPageProps> = ({match}) => {
  const { handleSubmit, control, errors } = useForm();
  const [showToast, setShowToast] = useState(false);
  /**
   * Get data of post 
  */
  const [post, setPost] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const fetchPosts = () => {
    setLoading(true);
    getDetailPost(match.params.id).then((response) => {
      if (response && response.data) {
        setPost(response.data);
      }
    },error => {
        console.log(JSON.stringify(error))
    }).finally(() => {
        setLoading(false);
    });
  };
  useEffect(() => {
    fetchPosts();
  }, [])
  
  /**
   * Get data of comments 
  */
  const [comments, setComments] = useState<Array<any>>([]);
  const fetchComments = () => {
    setLoading(true);
    getComments(match.params.id).then((response) => {
      if (response && response.data) {
        console.log(response.data)
        setComments(response.data);
      }
    },error => {
        console.log(JSON.stringify(error))
    }).finally(() => {
        setLoading(false);
    });
  };
  useEffect(() => {
    fetchComments();
  }, [])
  
  /**
   * Create new comment
   * @param data
   */
  const onSubmit = (data: any) => {
    data.postId = post ? post : 1;
    const info = JSON.stringify(data, null, 2);
    createComment(info).then(res => {
      fetchComments();
      setShowToast(true);    
    },error => {             
      console.log(error)
    })
  };
  
  const formFields: InputProps[] = [
    {
      name: "username",
      label: "Username",
    },
    {
      name: "body",
      label: "Body",
      component: <IonTextarea />
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
        {(loading) && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
          </div>
        )}
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
            {(loading) && (
              <div className="ion-text-center ion-padding">
                <IonSpinner name="crescent" />
              </div>
            )}
            {comments.map((comment,index) => (
              <Comments key={index} id={comment.id} userName={comment.username} comment={comment.body} />        
            ))}
          </IonCardContent>
        </IonCard>

        {(showToast) && (
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Your comment have been saved."
            duration={2000}
            color="success"
          />
        )}
      </IonContent>

    </IonPage>
  );
};

export default DetailPost;
