import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

export default ({ app }, inject) => {
  const config = {
    apiKey: "AIzaSyDFQt-sw4I4VuMfvZrwisSd_rzbytP8JV4",
    authDomain: "blogcms-3646e.firebaseapp.com",
    projectId: "blogcms-3646e",
    storageBucket: "blogcms-3646e.appspot.com",
    messagingSenderId: "1001568533715",
    appId: "1:1001568533715:web:0a1d68919de0b23c15a826",
    measurementId: "G-8MKYK4J267"
  };

  const firebaseApp = initializeApp(config)
  const auth = getAuth(firebaseApp)
  const db = getFirestore(firebaseApp)
  const analytics = getAnalytics(firebaseApp)
  const googleProvider = new GoogleAuthProvider()

  const firestore = {
    collection: (name) => collection(db, name),
    getCollection: async (name) => {
      const collectionRef = collection(db, name)
      const querySnapshot = await getDocs(collectionRef)
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    addDoc: async (name, data) => {
      const collectionRef = collection(db, name)
      return await addDoc(collectionRef, data)
    },
    updateDoc: async (name, id, data) => {
      const docRef = doc(db, name, id)
      return await updateDoc(docRef, data)
    },
    deleteDoc: async (name, id) => {
      const docRef = doc(db, name, id)
      return await deleteDoc(docRef)
    }
  }



  inject('firebase', { auth, firestore, analytics, googleProvider, signInWithPopup, signInWithEmailAndPassword, signOut })
}


