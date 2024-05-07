import { initializeApp } from 'firebase/app';
import { getFirestore, FirestoreDataConverter, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCGkUfEznj3WmpJHGAcHf8oc1s3dLaBMt8',
  authDomain: 'board-game-helper-3d631.firebaseapp.com',
  projectId: 'board-game-helper-3d631',
  storageBucket: 'board-game-helper-3d631.appspot.com',
  messagingSenderId: '383119970140',
  appId: '1:383119970140:web:d9e3ced1a31741122c3b99'
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };

export const getFirestoreConverter = <T>() => {
  const firestoreConverter: FirestoreDataConverter<T> = {
    fromFirestore(snapshot, options) {
      return snapshot.data(options) as T;
    },
    toFirestore(model: T) {
      return model;
    }
  };

  return firestoreConverter;
};

export const updateFirestoreDocument = async (collection: string, docId: string, data: any) => {
  const dockRef = doc(db, collection, docId);
  await updateDoc(dockRef, data);
};
