import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
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
import StoriesSection from "@/components/StoriesSection";

const IndexPage = () => {
  const { signOut } = useAuth();

  const posts = useQuery(api.posts.getFeedPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  if (posts === undefined) return <Loader />;

  if (posts.length === 0) return <NoPostsFound />;
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>spotlight</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListHeaderComponent={<StoriesSection />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
};

export default IndexPage;
