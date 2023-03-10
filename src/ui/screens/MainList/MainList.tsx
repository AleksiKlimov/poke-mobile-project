import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import type { Pokemon } from 'src/types/pokemon';
import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import usePokemons from 'src/hooks/usePokemons';
import useTheme from 'src/hooks/useTheme';
import PokemonItem from '../components/PokemonItem';

import styles from './MainList.styles';

type PokemonData = {
  item: Pokemon;
  index: number;
  separators: object;
};

type Props = NativeStackScreenProps<ParamListBase>;

const MainList: React.FC<Props> = (props) => {
  const { theme } = useTheme();
  const { navigation } = props;
  const {
    pokemons,
    isloading,
    isUpdating,
    onEndReached,
    isRefreshing,
    onRefresh,
  } = usePokemons();

  const keyExtractor = React.useCallback((item: Pokemon) => {
    return item.name;
  }, []);

  const onHandleDetailScreen = React.useCallback((name: string) => {
    return navigation.navigate('DetailItem', {
      name,
    });
  }, [navigation]);

  const renderItem = React.useCallback((data: PokemonData) => {
    return <PokemonItem handleNavigation={onHandleDetailScreen} pokemon={data.item} />;
  }, [onHandleDetailScreen]);

  return (
    <View
      style={styles({ theme }).sectionContainer}
    >{isloading
      ? <ActivityIndicator size="large" />
      : (
        <><FlatList
          data={pokemons}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={1}
          onEndReached={onEndReached}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />
          {isUpdating && (<ActivityIndicator
            style={styles({ theme }).indicatorStyles}
            size="large"
          />)}
        </>
      )}
    </View>
  );
};

export default React.memo(MainList);
