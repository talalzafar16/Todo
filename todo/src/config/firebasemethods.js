import app from "./firebaseconfig";
import {
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  remove,
  getDatabase,
  set,
  ref,
  onValue,
  push,
  
} from "firebase/database";

const db = getDatabase(app);
const auth = getAuth(app);
let signup = (obj) => {
  let { email, pass, contact, age } = obj;
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        const refrence = ref(db, `users/${user.uid}`);
        obj.id = user.uid;
        set(refrence, obj)
          .then(() => {
            resolve("User is successfully registered");
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let login = (obj) => {
  let { email, pass } = obj;
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        const refrence = ref(db, `users/${user.uid}`);
        onValue(refrence, (a) => {
          const data = a.val();
          resolve(data);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);
      });
  });
};
// console.log(auth)
let signout=()=>{ 
  const auth = getAuth(app);
  signOut(auth).then(()=>{
    console.log("signout successfully")
  }).catch(()=>{
    console.log("signout failed")
  })
}
let CheckUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(uid);
      } else {
        reject("No user Login");
      }
    });
  });
};
let addData = (obj, node, id) => {
  return new Promise((resolve, reject) => {
    let refrence;
    if (id) {
      refrence = ref(db, `${node}/${id}`);
    } else {
      let newRef = ref(db, node);
      obj.uid = push(newRef).key;
      refrence = ref(db, `${node}/${obj.uid}`);
      set(refrence, obj)
        .then((suc) => {
          resolve("data entered successfull");
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

let edit = (node, obj) => {
  return new Promise((resolve, reject) => {
    let refrence = ref(db, node);
    onValue(refrence, (e) => {
      let data = e.val();
      data.Todo = obj;
      set(refrence, data);
    });
  });
};

let deleteData = (node, id) => {
  return new Promise((resolve, reject) => {
    let refrence;
    if (id) {
      refrence = ref(db, `${node}/${id}`);
      remove(refrence);
    } else {
      refrence = ref(db, `${node}`);
      remove(refrence);
    }
  });
};

let getData = (node, id) => {
  return new Promise((resolve, reject) => {
    let refrence = ref(db, node);
    onValue(
      refrence,
      (a) => {
        if (a.exists()) {
          const data = a.val();
          if (id) {
            resolve(data);
          } else {
            resolve(Object.values(data));
          }
        } else {
          reject("No Data");
        }
      },
      { onlyOnce: false }
    );
  });
};

export {signout, signup, login, CheckUser, addData, getData, deleteData, edit };
