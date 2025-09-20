import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useAuth } from "@clerk/clerk-expo";
import { STORIES } from "@/constants/mock-data";
import StoryComp from "@/components/Story";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "@/components/loader";
import NoPostsFound from "@/components/noPostsFound";
import Post from "@/components/post";

const IndexPage = () => {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  if (posts === undefined) return <Loader />;

  if (posts.length === 0) return <NoPostsFound />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>spotlight</Text>

        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >
          {/* {STORIES.map((story) => (
            <StoryComp key={story.id} story={story} />
          ))} */}

          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default IndexPage;
