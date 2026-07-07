import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import AuthService from "../services/AuthService";
import "./Login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (username.trim() === "" || token.trim() === "") {
      setErrorMsg("Por favor, ingrese su nombre de usuario y token de GitHub.");
      return;
    }

    try {
      const success = await AuthService.login(username, token);

      if (success) {
        window.location.href = "/tab1";
      } else {
        setErrorMsg("Usuario o token inválidos.");
      }
    } catch (error) {
      setErrorMsg("Ocurrió un error al iniciar sesión.");
      console.error(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <IonIcon icon={logoGithub} className="github-icon" />

            <IonInput
              className="login-field"
              label="Nombre de usuario"
              labelPlacement="floating"
              fill="outline"
              type="text"
              value={username}
              onIonInput={(e) => setUsername(e.detail.value ?? "")}
            />

            <IonInput
              className="login-field"
              label="Token de GitHub"
              labelPlacement="floating"
              fill="outline"
              type="password"
              value={token}
              onIonInput={(e) => setToken(e.detail.value ?? "")}
            />

            {errorMsg && (
              <IonText color="danger">
                <p>{errorMsg}</p>
              </IonText>
            )}

            <IonButton
              className="login-button"
              expand="block"
              type="submit"
            >
              Iniciar Sesión
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;