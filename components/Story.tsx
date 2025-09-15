import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/styles/feed.styles";

type Story = {
  id: string;
  username: string;
  avatar: string;
  hasStory: string;
};

const StoryComp = ({ story }: { story: Story }) => {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
        <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUsername}>{story.username}</Text>
    </TouchableOpacity>
  );
};

export default StoryComp;
