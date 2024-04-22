import {View, TextInput, Platform, StyleSheet, TouchableOpacity, Text, ScrollView} from "react-native";
  //import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { useRef, useState, useEffect } from "react";
  import { Ionicons,Entypo } from "@expo/vector-icons";
  //import * as Clipboard from "expo-clipboard";
  import uuid from "react-native-uuid";
  const { GoogleGenerativeAI } = require("@google/generative-ai");

  
  export default function JournalEditor({ navigation, route }) {
    const entry = route.params?.Journal;

    // State to keep track of the user's input (both title and content of note)
    const [title, setTitle] = useState(entry?.title || "");
    const [content, setContent] = useState(entry?.content || "");
    const [existingEntry, setExistingEntry] = useState(null);
    //const [prompt, setPrompt] = useState('');



    useEffect(() => {
        const { entry } = route.params ?? {};
        if (entry) {
          setExistingEntry(entry);
          setTitle(entry.title);
          setContent(entry.content);
        }
      }, []);
    
  
    // Ref to control the scroll view (scroll to bottom, top, etc...)
    const scrollRef = useRef();
  
    const handleSave = () => {
        // If the user did not enter a title or content, do not save the note
        if (title == "" && content == "") {
            navigation.navigate("Journal");
            return;
        }
        if (existingEntry) {
            const newEntry = {
                ...existingEntry,
                title,
                content,
                lastModified: Date.now(),
            };
            navigation.navigate("Journal", { newEntry });
            return;
        }
        
        // If the user did not enter a title or content, do not save the note
        const newEntry = {
            id: entry?.id || uuid.v4(),
            title,
            content,
            lastModified: Date.now(),
        };

        navigation.navigate("Journal", { newEntry });
    };
  
    // Function to be called when the user presses the "trashcan" icon
    const handleDeletion = () => {
        if (existingEntry) {
            navigation.navigate("Journal", { deletedEntryId: existingEntry.id });
            return;
        }
      // Step 3 - part 6
      navigation.navigate("Journal", entry?.id && { deletedEntryId: entry.id });
    };
  
    // node --version # Should be >= 18npm 
// npm install @google/generative-ai

    const {
        GoogleGenerativeAI,
        HarmCategory,
        HarmBlockThreshold,
    } = require("@google/generative-ai");


    // Function to copy the note's content to the clipboard (uses Expo SDK's Clipboard module)
    const generatePrompt = async () => {
        try {
        const genAI = new GoogleGenerativeAI("AIzaSyB6WI7g4ENpYQVIs7c1EBFdW0XbemwYo8s");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
        const generationConfig = { temperature: 0.9, topK: 1, topP: 1, maxOutputTokens: 2048 };
    
        const result = await model.generateContent("Generate a journaling prompt for mental health but in your response only include the prompt.");
    
        const response = await result.response;
        const generatedPrompt = result.response.text();
        setTitle(generatedPrompt);
      } catch (error) {
        setTitle("Error: Unable to generate prompt");
      }
    
  };

  
    return (
      <View style={styles.container}>
        {/* Header with action buttons */}
        <View style={styles.headerContainer}>
          {/* Save button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="checkmark-done" size={20} color="white" />
            <Text style={styles.saveButtonText}>Done</Text>
          </TouchableOpacity>
          <View style={styles.actionButtonsContainer}>
            {/* Delete ("trashcan") button*/}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeletion}
            >
              <Ionicons name="trash-outline" size={24} color="black" />
            </TouchableOpacity>
            {/* Copy button */}
            <TouchableOpacity style={styles.copyButton} onPress={generatePrompt}>
              <Entypo name="book" size={24} color="black" />
              <Text style={styles.copyButtonText}>Generate prompt</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Step 3 - part 3 */}
        {/* Scrollable view for the note editor */}
        <ScrollView
        ref={scrollRef}
        style={styles.editorContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Text input fields for the note's title */}
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
          multiline
        />
        {/* Text input fields for the note's content */}
        <TextInput
          placeholder="Start typing here..."
          value={content}
          onChangeText={setContent}
          style={styles.contentInput}
          multiline
          scrollEnabled={false}
        />
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      height: 100,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: "white",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: "#d7d7d7",
    },
    saveButton: {
      marginLeft: "5%",
      backgroundColor: "#A4B0E4",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 5,
      marginBottom: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    saveButtonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 13,
      paddingLeft: 5,
    },
    actionButtonsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: "5%",
      marginBottom: 10,
    },
    deleteButton: {
      marginRight: 15,
    },
    copyButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    copyButtonText: {
      paddingLeft: 5,
    },
    editorContainer: {
      flex: 1,   
      paddingHorizontal: "5%",
      paddingVertical: "5%",
      paddingTop: 100,
    },
    titleInput: {
      fontSize: 20,
      fontWeight: "600",
      marginVertical: "10%",
    },
    contentInput: {
      fontSize: 16,
      fontWeight: "300",
      marginBottom: 150,
    },
  });