import { db, storage } from "../firebase";
import {
    serverTimestamp,
    addDoc,
    collection,
    query,
    updateDoc,
    doc,
    where,
    getDocs,
    orderBy, limit,
    deleteDoc,
} from "firebase/firestore";

export async function createGroup(Group) {
    // console.log('Add Group ', Group)
    return await addDoc(collection(db, "groups"), {
        ...Group,
        CreatedAt: serverTimestamp(),
    });
}

export async function updateGroup(groupId, updatedGroup) {
    const groupRef = doc(db, "groups", groupId);
    await updateDoc(groupRef, updatedGroup);
}

export async function getGroups() {
    const Groups = [];
    const q = query(collection(db, "groups"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        Groups.push({ ...doc.data(), id: doc.id });
    });
    return Groups;
}