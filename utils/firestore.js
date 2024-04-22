import { firebase } from '../utils/firebaseConfig';

export const saveEntryToFirestore = async (userId, entries) => {
    try {
        const batch = firebase.firestore().batch();
        const entriesRef = firebase.firestore().collection('users').doc(userId).collection('entries');

        entries.forEach((entry) => {
            const entryRef = entriesRef.doc(entry.id);
            batch.set(entryRef, entry);
        });

        await batch.commit();
    } catch (error) {
        console.error('Error saving entries to Firestore:', error);
    }
};

export const saveTasksToFirestore = async (userId, tasks) => {
    try {
        const batch = firebase.firestore().batch();
        const tasksRef = firebase.firestore().collection('users').doc(userId).collection('tasks');

        tasks.forEach((task) => {
            const taskRef = tasksRef.doc(task.id);
            batch.set(taskRef, task);
        });

        await batch.commit();
    } catch (error) {
        console.error('Error saving tasks to Firestore:', error);
    }
};
