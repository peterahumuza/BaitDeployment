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

export default async function createStudent(student) {
    // console.log('Add student ', student)
    return await addDoc(collection(db, "users"), {
        ...student,
        CreatedAt: serverTimestamp(),
    });
}

export async function getStudents() {
    const students = [];
    const q = query(collection(db, "users"), where("IsStudent", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        students.push({ ...doc.data(), id: doc.id });
    });
    return students;
}
