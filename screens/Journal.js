import {useEffect, useState} from 'react';
import { FlatList, StyleSheet, ScrollView, Text, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import JournalItem from '../components/JournalItem';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { firebase } from '../utils/firebaseConfig';
import {saveEntryToFirestore} from '../utils/firestore'

export default function Journal({ navigation, route }) {
  const { width, height } = useWindowDimensions();
  const [gradientColors, setGradient] = useState(['#2E97D1', '#FEC49F','#F56810'])

  // Used to create gradient background based on time of day
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
  
    if (hours < 12) {
      setGradient(['#2E97D1', '#FEC49F','#F56810']);
    } else if (hours < 18) {
      setGradient(['#70B3C2', '#FFEBE1', '#A0AEE7']);
    } else {
      setGradient(['#9D89C4', '#FFAC6B']);
    }
  }, []); 


  // State to keep track of the user's journal entries
  const [entries, setEntries] = useState(null);

  // Load entries from Firestore when the screen is mounted
  useEffect(() => {
    const userId = firebase.auth().currentUser?.uid;
    if (userId) {
        const entriesRef = firebase.firestore().collection('users').doc(userId).collection('entries');
        entriesRef.onSnapshot((snapshot) => {
            const loadedEntries = [];
            snapshot.forEach((doc) => {
                loadedEntries.push(doc.data());
            });
            setEntries(loadedEntries);
        });
    }
  }, []);

  // Save entries to Firestore whenever they change
  useEffect(() => {
      const userId = firebase.auth().currentUser?.uid;
      if (userId && entries) {
          saveEntryToFirestore(userId, entries);
      }
  }, [entries]);

  // Hook to handle the deletion of an entry (received via params from the JournalEditor screen)
  useEffect(() => {
    const deletedEntryId = route.params?.deletedEntryId;
    if (deletedEntryId) {
      // Remove the entry from Firestore
      const userId = firebase.auth().currentUser?.uid;
      if (userId) {
        const entryRef = firebase.firestore().collection('users').doc(userId).collection('entries').doc(deletedEntryId);
        entryRef.delete()
          .then(() => {
            console.log("Entry successfully deleted from Firestore");
          })
          .catch((error) => {
            console.error("Error deleting entry from Firestore:", error);
          });
      }

      // Update the local state to remove the deleted entry
      setEntries((prevEntries) =>
        prevEntries?.filter((entry) => entry.id !== deletedEntryId)
      );
    }
  }, [route.params?.deletedEntryId]);
    

    
  // Hook to handle the creation or update of an entry (received via params from the JournalEditor screen)
  useEffect(() => {
    const newEntry = route.params?.newEntry;
    if (newEntry) {
      setEntries((prevEntries) => {
        if (!prevEntries) {
          // If prevEntries is null, initialize it as an empty array
          prevEntries = [];
        }
        const existingEntryIndex = prevEntries.findIndex((entry) => entry.id === newEntry.id);
        if (existingEntryIndex !== -1) {
          // If the entry already exists, update it
          const updatedEntries = [...prevEntries];
          updatedEntries[existingEntryIndex] = newEntry;
          return updatedEntries;
        } else {
          // If the entry is new, add it to the array
          return [...prevEntries, newEntry];
        }
      });
    }
  }, [route.params?.newEntry]);

  const emptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={{ color: 'white', fontWeight: 500, fontSize: 15 }}>Press the "Pencil" Icon to get started</Text>
    </View>
  );

  return (
    <>
    <Canvas style={{ flex: 1 }}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient 
          start={vec(0,0)}
          end={vec(width, height)}
          colors={gradientColors}
          />
      </Rect>
    </Canvas>
    <View style={styles.container}>
      <Text style={styles.greeting}>Journal</Text>
        <FlatList
            style={styles.listContainer}
            // Sort the entries by last modified date
            data={entries?.sort((a, b) => b.lastModified - a.lastModified)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <JournalItem item={item} navigation={navigation} />
            )}
            contentContainerStyle={styles.listContentContainer}
            ListEmptyComponent={emptyList}
          />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("JournalEditor")}
      >
        <Ionicons name="pencil" size={25} color="#A4B0E4" />
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: "transparent",
    paddingTop: 75,
    paddingHorizontal: 25,
    width: "100%",
    height: "100%",
  },
  greeting: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    width: "100%",
  },
  listContentContainer: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
    minHeight: '300%',
  },
  addButton: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "white",
    borderRadius: 30,
    elevation: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});