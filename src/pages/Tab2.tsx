import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>


        <div className="form-container">
          <IonInput className="input-field" label="Nombre" labelPlacement="floating" placeholder="Ingrese el nombre del repositorio"/>
            
          <IonTextarea className="input-field" label="Descripción" labelPlacement="floating" placeholder="Ingrese la descripción del repositorio" rows={4}/>
          
          <IonButton className="form-field" expand="block" color="primary">Agregar Repositorio</IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
