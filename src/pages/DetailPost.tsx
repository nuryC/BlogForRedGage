import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, 
  IonCardHeader, IonCardContent, IonTextarea, IonButton, IonItemDivider, 
  IonLabel, IonButtons, IonBackButton, IonSpinner, IonToast } from '@ionic/react';
import PostDetail from '../components/PostDetail';
import Comments from '../components/Comments';
import {commentsPost} from '../staticData/comments';
import {Posts} from '../staticData/posts';
import { useForm } from "react-hook-form";
import Input, { InputProps } from "../components/Input";
import {getDetailPost, getComments, getPosts, createComment, editPost} from '../services/api';
import './DetailPost.css';
import { RouteComponentProps } from 'react-router';
interface UserDetailPageProps extends RouteComponentProps<{
    id: string;
}> {}

const DetailPost: React.FC<UserDetailPageProps> = ({match}) => {
  const { handleSubmit, control, errors, reset } = useForm();
  const [showToast, setShowToast] = useState(false);
  let entrance;
  let commentsForPost:Array<any> = [];

  
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

  /**
   * Get data of post 
  */
  const [loading, setLoading] = useState(false);
  const fetchPosts = () => {
    for (let i = 0; i < Posts.length; i++) {
      if(Posts[i].id == parseInt(match.params.id)){
        entrance = Posts[i];
        return entrance;
      }
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [])
  console.log(fetchPosts())

  /**
   * Get data of comments 
  */
  const fetchComments = () => {
    for (let i = 0; i < commentsPost.length; i++) {
      if(commentsPost[i].postId == parseInt(match.params.id)){
        commentsForPost.push(commentsPost[i]);
      }
    }
    return commentsForPost;
  };
  useEffect(() => {
    fetchComments();
  }, []);

  console.log(fetchComments());

  /**
   * Create new comment
   * @param data
   */
  const onSubmit = (data: any) => {
    data.postId = entrance.id;
    let commentL = commentsPost.length;
    data.id = commentL + 1;
    
    setLoading(true)
    commentsPost.push({
      "username": data.username,
      "body": data.body,
      "postId": data.postId,
      "id": data.id
    });
    
    setTimeout(() => {
      
      setLoading(false);
      setShowToast(true);
    }, 1000);
  };

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
        <PostDetail id={entrance.id} title={entrance.title} userName={entrance.username} content={entrance.body} timestamp={entrance.createdAt} />
        
        <IonItemDivider></IonItemDivider>

        <IonCard className="commentCard">
          <IonCardContent>
            <IonItemDivider>
              <IonLabel>
                <p >Make a comment</p>
              </IonLabel>
            </IonItemDivider>
            <form id="formComments" onSubmit={handleSubmit(onSubmit)}>
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
            {commentsForPost.map((comment,index) => (
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
