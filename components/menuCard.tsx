import { MenuItem } from '@/type';

import React from 'react';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';

const MenuCard = ({ item: { image_url, name, price } }: { item: MenuItem }) => {
  const imageUrl = `${image_url}&mode=admin`;

  return (
    <TouchableOpacity
      className="menu-card"
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
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold text-dark-100 mb-4"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb04">From R{price}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text className="paragraph-bold text-primary">Add To Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;
