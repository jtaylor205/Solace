import {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import { loadFromStorage , saveToStorage} from '../utils/storage';
import JournalItem from '../components/JournalItem';
import uuid from 'react-native-uuid';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'

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
      setGradient(['#66CCFF', '#FFCC99']);
    } else {
      setGradient(['#9D89C4', '#FFAC6B']);
    }
  }, []); 


  // State to keep track of the user's journal entries
  const [entries, setEntries] = useState(null);

  // Hook to load the notes from the device's storage when the screen is mounted
  useEffect(() => {
    loadFromStorage("entries").then((loadedEntries) => {
    setEntries(loadedEntries);
  });
    }, []);
  
  // Hook to save the entries to the device's storage whenever the entry changes (create, update, delete)
    useEffect(() => {
      if (entries) {
        saveToStorage(entries, "entries");
      }
    }, [entries]);

    // Hook to handle the deletion of an entry (received via params from the JournalEditor screen)
      useEffect(() => {
        const deletedEntryId = route.params?.deletedEntryId;
        if (deletedEntryId) {
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
        const entryExists = prevEntries.some((entry) => entry.id === newEntry.id);
        if (entryExists) {
          return prevEntries.map((entry) =>
            entry.id === newEntry.id ? newEntry : entry
          );
        } else {
          return [...prevEntries, newEntry];
        }
      });
    }
  }, [route.params?.newEntry]);


  // Step 3 - part 8
  const emptyList = () => (
    <View style={styles.emptyContainer}>
      <Text>Press the "pencil" button to get started</Text>
    </View>
  );


  return (
    <>
    <View style={styles.container}>
    <ScrollView style={styles.listContainer}>
    <FlatList
        // Sort the entries by last modified date
        data={entries?.sort((a, b) => b.lastModified - a.lastModified)}
        keyExtractor={(item) => item.id}
        // What to render for each entry
        renderItem={({ item }) => (
          <JournalItem item={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.listContentContainer}
        style={styles.listContainer}
        ListEmptyComponent={emptyList}
      />
    </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("JournalEditor")}
      >
        <Ionicons name="pencil" size={25} color="white" />
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    width: "100%",
  },
  listContentContainer: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
  },
  addButton: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#39485e",
    borderRadius: 30,
    elevation: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});