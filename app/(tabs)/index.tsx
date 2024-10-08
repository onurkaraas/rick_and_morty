import React from "react";
import { SafeAreaView } from "react-native";
import SearchComponent from "@/components/SearchComp";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/queryClient";

const HomePage: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{ flex: 1, paddingTop: 30npx }}>
        <SearchComponent />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default HomePage;
