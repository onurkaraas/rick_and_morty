import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import tw from "twrnc";
import { useRouter } from "expo-router";
import { useSearchCharacters } from "@/hooks/useSearchCharacters";
import { CheckBox } from "@rneui/base";
import Loading from "@/components/Loading";

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState("");
  const {
    data: characters,
    isLoading,
    isError,
    error,
  } = useSearchCharacters(query);
  const [selectedEpisodes, setSelectedEpisodes] = useState<string[]>([]);
  const router = useRouter();

  const toggleSelection = (name: string[]) => {
    if (selectedEpisodes.includes(name)) {
      setSelectedEpisodes(
        selectedEpisodes.filter((episode) => episode !== name),
      );
    } else {
      setSelectedEpisodes([...selectedEpisodes, name]);
    }
  };

  const removeEpisode = (episode: string) => {
    setSelectedEpisodes((prev) => prev.filter((code) => code !== episode));
  };

  const highlightQuery = (name: string, query: string) => {
    if (!query) return name;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = name.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text key={index} style={tw`font-bold`}>
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      ),
    );
  };

  return (
    <View style={tw`flex-1 p-4 justify-center `}>
      <TextInput
        style={tw`border p-2 mb-4`}
        placeholder="Search for a character..."
        value={query}
        onChangeText={setQuery}
      />

      {isLoading && <Loading />}
      {isError && <Text>Error fetching characters: {error?.message}</Text>}

      <FlatList
        data={characters || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSelection(item.name)}
            style={tw`flex-row items-start bg-white rounded shadow border mb-2`}
          >
            <CheckBox
              checked={selectedEpisodes.includes(item.name)}
              onPress={() => toggleSelection(item.name)}
              style={tw`mr-2`}
            />
            <View
              onPress={() => toggleSelection(item.name)}
              style={tw`mx-2 p-2 bg-white `}
            >
              <Image
                source={{ uri: item.image }}
                style={tw`w-12 h-12 rounded-full mr-2`}
              />
              <View>
                <Text>{highlightQuery(item.name, query)}</Text>
                <Text>{item.episode.length} episodes</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <ScrollView style={tw`border p-2 mt-4 pb-8`}>
        <Text>Selected :</Text>
        <View style={tw`flex-row w-full flex-wrap`}>
          {selectedEpisodes.map((episode, index) => (
            <View key={index} style={tw`flex-row items-center mr-2 mb-1`}>
              <Text>{episode}</Text>
              <TouchableOpacity
                onPress={() => removeEpisode(episode)}
                style={tw`ml-2`}
              >
                <Text style={tw`text-red-500 border  px-1.5 rounded-md`}>
                  X
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchComponent;
