import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Checkbox from './Checkbox'
import { auth } from "../utils/firebaseConfig";


function Task({ item, onCheck, onDeletion }) {
    return (
        <View style={styles.task}>
            <Checkbox isChecked={item.completed} onCheck={() => onCheck(item.id)}/>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => onDeletion(item.id)}>
                <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        
    },
    taskText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 15,
    },
    checkBtn: {
        color: 'white',
        fontSize: 20,
    },
    closeBtn: {
        marginLeft: 'auto',
    },

})

export default Task