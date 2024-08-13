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

export async function createSystemPrompt(SystemPrompt) {
    // console.log('Add SystemPrompt ', SystemPrompt)
    return await addDoc(collection(db, "systemprompts"), {
        ...SystemPrompt,
        CreatedAt: serverTimestamp(),
    });
}

export async function deleteSystemPrompt(SystemPromptId) {
    const SystemPromptRef = doc(db, "systemprompts", SystemPromptId);
    await deleteDoc(SystemPromptRef);
}

export async function updateSystemPrompt(SystemPromptId, updatedSystemPrompt) {
    const SystemPromptRef = doc(db, "systemprompts", SystemPromptId);
    await updateDoc(SystemPromptRef, updatedSystemPrompt);
}

export async function getSystemPrompts() {
    const SystemPrompts = [];
    const q = query(collection(db, "systemprompts"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        SystemPrompts.push({ ...doc.data(), id: doc.id });
    });
    return SystemPrompts;
}