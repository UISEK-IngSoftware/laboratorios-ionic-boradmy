import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-conteiner">
          <IonCard>
            <img src="https://avatars.githubusercontent.com/u/235414844?s=400&u=22ac72cc5af68055bb634db666d6ebb944084347&v=4" alt="Foto de perfil" className="profile-image"/>
            <IonCardHeader>
              <IonCardTitle>Stiveen Paredes</IonCardTitle>
              <IonCardSubtitle>Desarrollador de Software</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Hola, soy Stiveen Paredes, un apasionado desarrollador de software con experiencia en el desarrollo de aplicaciones móviles y web. Me encanta aprender nuevas tecnologías y enfrentar desafíos de programación.</p>
              <p>En mi tiempo libre, disfruto contribuyendo a proyectos de código abierto y explorando nuevas tendencias en el mundo del desarrollo de software.</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
