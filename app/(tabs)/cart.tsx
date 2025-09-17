import CartItem from '@/components/cartItem';
import CustomHeader from '@/components/CustomHeader';
import { useCartStore } from '@/store/cart.store';
import { PaymentInfoStripeProps } from '@/type';
import cn from 'clsx';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PaymentInfoStripe = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View className="flex-between flex-row my-1">
    <Text className={cn('paragraph-medium text-gray-200', labelStyle)}>
      {label}
    </Text>
    <Text className={cn('paragraph-bold text-dark-100', valueStyle)}>
      {value}
    </Text>
  </View>
);

const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} key={item.id} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
        ListEmptyComponent={() => <Text> Cart Empty</Text>}
        ListFooterComponent={() =>
          totalItems > 0 && (
            <View className="gap-5">
              <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                <Text className="h3-bold">Payment Summary</Text>
                <PaymentInfoStripe
                  label={`Total Items ${totalItems}`}
                  value={`${totalPrice.toFixed(2)}`}
                />
                <PaymentInfoStripe label={`Delivering Fee `} value={`$5.00`} />
                <PaymentInfoStripe label={`Discount `} value={`- $2`} />

                <View className="border-t border-gray-300 my-2" />
                <PaymentInfoStripe
                  label={`Total`}
                  value={`$${(totalPrice + 5 - 20).toFixed(2)}`}
                  labelStyle="base-bold !text-dark-100"
                  valueStyle="base-bold !text-dark-100"
                />
              </View>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  content: {
    paddingBottom: 112,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});
