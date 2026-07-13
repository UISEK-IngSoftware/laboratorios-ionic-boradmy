import React from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./Tab1.css";
import RepoItem from "../components/RepoItem";
import { Repository } from "../interfaces/Repository";
import { fetchRepositories, deleteRepository } from "../services/GithubService";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const history = useHistory();

  const loadRepositories = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const reposData = await fetchRepositories();
      // Validar que sea un array
      if (Array.isArray(reposData)) {
        setRepos(reposData);
      } else {
        setRepos([]);
        setErrorMsg("Los datos recibidos no son válidos.");
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    loadRepositories();
  });

  const handleEdit = (repo: Repository) => {
    history.replace("/tab2", { repo });
  };

  const handleDelete = async (repo: Repository) => {
    if (!window.confirm(`¿Eliminar el repositorio "${repo.name}"?`)) {
      return;
    }
    try {
      await deleteRepository(repo.owner.login, repo.name);
      loadRepositories();
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {!loading && Array.isArray(repos) && repos.length > 0 && (
          <IonList>
            {repos.map((repo) => (
              <RepoItem
                key={repo.id}
                {...repo}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </IonList>
        )}

        <LoadingSpinner isOpen={loading} />

        {errorMsg && (
          <IonText color="danger">
            <p>{errorMsg}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
