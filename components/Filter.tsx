import { Category } from '@/type';
import cn from 'clsx';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || '');

  const handlePress = (id: string) => {
    setActive(id);

    if (id === 'all') router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: 'all', name: 'All' }, ...categories]
    : [{ $id: 'all', name: 'All' }];

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.$id}
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
          className={cn(
            'filter',
            active === item.$id ? 'bg-amber-500' : 'bg-white'
          )}
          onPress={() => handlePress(item.$id)}
        >
          <Text
            className={cn(
              'body-medium',
              active === item.$id ? 'text-white' : 'text-gray-200'
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Filter;

const styles = StyleSheet.create({
  content: {
    columnGap: 8,
    paddingBottom: 12,
  },
});
