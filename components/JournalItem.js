import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default JournalItem = ({ item, navigation }) => {
  const date = new Date(item.lastModified);

  // Format the date to be more human-readable
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  // Check if the title or content is empty and display "Empty [Title/Text]" accordingly
  const title = item.title.trim() !== "" ? item.title : "(Empty Title)";
  const content = item.content.trim() !== "" ? item.content : "(Empty Text)";

  return (
    <TouchableOpacity
      style={styles.entryItem}
      // On click of the entry, navigate to the Journal Editor screen with the entry as a parameter
      onPress={() => navigation.navigate("JournalEditor", { entry: item })}
    >
      {/* Display the title, content, and date of the entry */}
      <Text style={styles.JournalTitle} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text style={styles.journalContent} numberOfLines={1} ellipsizeMode="tail">
        {content}
      </Text>
      <Text style={styles.journalDate}>{formattedDate}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  entryItem: {
    height: 115,
    alignItems: "left",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#c7c7c7",
    paddingVertical: "5%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  JournalTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  journalContent: {
    fontSize: 15,
    fontWeight: "300",
  },
  journalDate: {
    fontSize: 12,
    fontWeight: "300",
  },
});