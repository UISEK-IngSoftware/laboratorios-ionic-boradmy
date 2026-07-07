import React from "react";
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import { pencilOutline, trashOutline } from "ionicons/icons";
import { Repository } from "../interfaces/Repository";

interface RepoItemProps extends Repository {
  onEdit: (repo: Repository) => void;
  onDelete: (repo: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({
  onEdit,
  onDelete,
  ...repository
}) => {
  return (
    <IonItemSliding>
      <IonItem>
        <img
          src={repository.owner.avatar_url}
          alt={repository.name}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "12px",
          }}
        />

        <IonLabel>
          <h2>{repository.name}</h2>
          <p>{repository.description}</p>
          <p>Lenguaje: {repository.language}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption
          color="warning"
          onClick={() => onEdit(repository)}
        >
          <IonIcon icon={pencilOutline} slot="icon-only" />
        </IonItemOption>

        <IonItemOption
          color="danger"
          onClick={() => onDelete(repository)}
        >
          <IonIcon icon={trashOutline} slot="icon-only" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;