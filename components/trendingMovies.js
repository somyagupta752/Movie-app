import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { image500 } from '../api/moviedb';

export default function TrendingMovies({ data }) {
    
    const width = Dimensions.get('window').width;

    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <Carousel
                width={width}
                height={400}
                data={data}
                style={{ margin: 'auto' }}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item }) => <MovieCard item={item} />}
            />
        </View>
    )
}

const MovieCard = ({ item }) => {
    const navigation = useNavigation();
    const handleClick = () => {
        navigation.navigate('Movie', item);
    }
    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <Image
                //source={require('../assets/images/movie.jpg')}
                source={{ uri: image500(item.poster_path) }}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }}
                className="rounded-3xl"></Image>
        </TouchableWithoutFeedback>
    )
}



