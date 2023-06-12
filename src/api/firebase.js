// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { v4 as uuid } from 'uuid'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getDatabase,
  ref,
  get,
  set,
  remove,
} from 'firebase/database'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new GoogleAuthProvider()
const database = getDatabase(app)
export async function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential =
        GoogleAuthProvider.credentialFromResult(result)

      // The signed-in user info.
      const user = result.user
    })
    .catch(console.error)
}

export function logout() {
  signOut(auth).catch(console.error)
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null
    callback(updatedUser)
  })
}

async function adminUser(user) {
  return get(ref(database, 'admins')).then((snapshot) => {
    if (snapshot.exists) {
      const admins = snapshot.val()
      const isAdmin = admins.includes(user.uid)
      return {
        ...user,
        isAdmin,
      }
    }
  })
}

export function addNewProduct(data) {
  const id = uuid()
  return set(ref(database, `products/${id}`), {
    ...data,
    id,
    price: parseInt(data.price),
    size: data.size.split(','),
  })
}

export async function getProducts() {
  return get(ref(database, 'products')).then((snapshot) => {
    if (snapshot.exists())
      return Object.values(snapshot.val())
  })
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then(
    (snapshot) => {
      const items = snapshot.val() || {}
      return Object.values(items)
    }
  )
}

export async function addOrUpdateToCart(userId, product) {
  return set(
    ref(database, `carts/${userId}/${product.id}`),
    product
  )
}

export async function removeFromCart(userId, productId) {
  return remove(
    ref(database, `carts/${userId}/${productId}`)
  )
}
