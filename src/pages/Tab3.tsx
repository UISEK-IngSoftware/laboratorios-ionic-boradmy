import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

import "./Tab3.css";
import { GithubUser } from "../interfaces/GithubUser";
import { getUserInfo } from "../services/GithubService";
import LoadingSpinner from "../components/LoadingSpinner";
import AuthService from "../services/AuthService";

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");

  const history = useHistory();

  const loadUserInfo = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const userData = await getUserInfo();
      setUserInfo(userData);
    } catch (error: any) {
      setErrorMsg(
        "Error al cargar la información del usuario: " + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    history.replace("/login");
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  });

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
          {userInfo && (
            <IonCard>
              <img
                src={userInfo.avatar_url}
                alt={userInfo.name || userInfo.login}
              />

              <IonCardHeader>
                <IonCardTitle>{userInfo.name}</IonCardTitle>
                <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                <p>{userInfo.bio}</p>
              </IonCardContent>
            </IonCard>
          )}

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <IonButton color="danger" onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Salir
            </IonButton>
          </div>
        </div>

        {errorMsg && (
          <IonText color="danger">
            <p>{errorMsg}</p>
          </IonText>
        )}

        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;