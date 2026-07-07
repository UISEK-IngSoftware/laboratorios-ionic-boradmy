import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import "./Tab2.css";
import { useHistory, useLocation } from "react-router-dom";

import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import { Repository } from "../interfaces/Repository";
import {
  createRepository,
  updateRepository,
} from "../services/GithubService";

import LoadingSpinner from "../components/LoadingSpinner";

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const [editingRepo, setEditingRepo] = React.useState<Repository | null>(null);

  const [repoFormData, setRepoFormData] = React.useState<RepositoryPayload>({
    name: "",
    description: "",
  });

  useIonViewWillEnter(() => {
    const repo = (location.state as { repo?: Repository })?.repo;

    setErrorMsg("");

    if (repo) {
      setEditingRepo(repo);

      setRepoFormData({
        name: repo.name,
        description: repo.description ?? "",
      });
    } else {
      setEditingRepo(null);

      setRepoFormData({
        name: "",
        description: "",
      });
    }
  });


  const saveRepository = async () => {
    if (repoFormData.name.trim() === "") {
      setErrorMsg("El nombre del repositorio es obligatorio.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      if (editingRepo) {
        await updateRepository(
          editingRepo.owner.login,
          editingRepo.name,
          repoFormData
        );
      } else {
        await createRepository(repoFormData);
      }
      setRepoFormData({
        name: "",
        description: "",
      });
      setEditingRepo(null);
      history.replace("/tab1");
    } catch (error: any) {
      setErrorMsg(
        "Error al guardar repositorio: " + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {editingRepo
              ? "Editar repositorio"
              : "Agregar repositorio"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Formulario de repositorio
            </IonTitle>
          </IonToolbar>
        </IonHeader>


        <div className="form-container">

          <IonInput
            className="input-field"
            label="Nombre"
            labelPlacement="floating"
            fill="outline"
            placeholder="Ingrese el nombre del repositorio"
            value={repoFormData.name}
            onIonInput={(e) =>
              setRepoFormData({
                ...repoFormData,
                name: e.detail.value ?? "",
              })
            }
          />


          <IonTextarea
            className="input-field"
            label="Descripción"
            labelPlacement="floating"
            fill="outline"
            rows={4}
            placeholder="Ingrese la descripción del repositorio"
            value={repoFormData.description}
            onIonInput={(e) =>
              setRepoFormData({
                ...repoFormData,
                description: e.detail.value ?? "",
              })
            }
          />


          {errorMsg && (
            <IonText color="danger">
              <p>{errorMsg}</p>
            </IonText>
          )}


          <IonButton
            className="form-field"
            expand="block"
            color="primary"
            onClick={saveRepository}
          >
            {editingRepo
              ? "Guardar cambios"
              : "Agregar Repositorio"}
          </IonButton>

        </div>


        <LoadingSpinner isOpen={loading} />

      </IonContent>
    </IonPage>
  );
};

export default Tab2;