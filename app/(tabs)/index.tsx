import React from "react";
import { SafeAreaView, View } from "react-native";
import SearchComponent from "@/components/SearchComp";
import { SafeAreaProvider } from "react-native-safe-area-context";

const HomePage: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchComponent />
    </SafeAreaView>
  );
};

export default HomePage;
