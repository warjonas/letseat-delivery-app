import { images } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();

  const [query, setQuery] = useState(params.query);

  const debounceSearch = useDebouncedCallback(
    (text: string) => router.push(`/search?query=${text}`),
    500
  );

  const handleSearch = (text: string) => {
    setQuery(text);

    if (!text) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (query?.trim()) router.setParams({ query });
  };

  return (
    <View
      className="searchbar px-3 "
      style={
        Platform.OS === 'android'
          ? { elevation: 10, shadowColor: '#878787' }
          : {
              shadowColor: '#878787',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }
      }
    >
      <TextInput
        className="flex-1 p-5"
        placeholder="Search food"
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor={'#A0A0A0'}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity
        className="pr5"
        onPress={() => router.setParams({ query })}
      >
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor={'#5F5F6D'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
