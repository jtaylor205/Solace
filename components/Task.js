import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function Task(props) {
    return (
        <View style={styles.task}>
            <Text style={styles.taskText}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    task: {

    },
    taskText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },


})

export default Task