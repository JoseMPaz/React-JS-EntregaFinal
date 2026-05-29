import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const productsRef = collection(db, "products");

export const getProducts = async () => {
    try {
        const snapshot = await getDocs(productsRef);

        const productsFormat = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        return productsFormat;
    } catch (error){
           console.error("Error fetching products: ", error);
        return [];
    }
};  

export const getProductById = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        const snapshot = await getDoc(productRef);
        
        if (snapshot.exists()) {
            const product = { id: snapshot.id, ...snapshot.data() };
            return product;
        }
    } catch (error) {
        console.error("Error fetching product by ID: ", error);
        return null;
    }
};
        