import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View, Image, Dimensions, Text } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
export default function MovieScreen() {
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})
    let movieName = 'Ant-Man and the Wasp: Quantumania';
    useEffect(() => {
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item]
    )

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        if (data) setMovie(data)
        setLoading(false)
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        if (data && data.cast) setCast(data.cast)
        setLoading(false)
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        if (data && data.results) setSimilarMovies(data.results)
        setLoading(false)
    }

    return (
        <SafeAreaView className='flex-1'>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                className="flex-1 bg-neutral-900">

                <View className='w-full'>

                    <View className='absolute top-0 z-20 w-full flex-row justify-between items-center px-3 py-4'>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.background]} className='rounded-xl p-1 h-10 aspect-square'>
                            <ChevronLeftIcon size="28" strokeWidth={2.5} color='white'></ChevronLeftIcon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                            <HeartIcon size='35' color={isFavourite ? theme.background : 'white'} />
                        </TouchableOpacity>
                    </View>
                    {
                        loading ? (
                            <Loading />
                        ) : (
                            <View>
                                <Image
                                    source={movie?.poster_path?{ uri: image500(movie?.poster_path)}: fallbackMoviePoster }
                                    style={{ width: width, height: height * 0.55 }}
                                />
                                {/* <LinearGradient
                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1']}
                            style={{ width, height: height * 0.40 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0" /> */}
                            </View>
                        )
                    }

                </View>
                <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                    <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                        {
                            movie?.title
                        }
                    </Text>
                    {
                        movie?.id ? (
                            <Text className='text-neutral-400 font-semibold text-base text-center'>
                                {movie?.status} - {movie?.release_date?.split('-')[0]}  - {movie?.runtime} min
                            </Text>
                        ) : null
                    }

                    <View className="flex-row justify-center mx-4 space-x-2">
                        {
                            movie?.genres?.map((genre, index) => {
                                let showDot = index + 1 != movie.genres.length;
                                return (
                                    <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                        {genre?.name} {showDot ? '-' : null}
                                    </Text>
                                )
                            })
                        }

                        {/* <Text className="text-neutral-400 font-semibold text-base text-center">
                            Thrill
                        </Text>
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            Comedy
                        </Text> */}
                    </View>
                    <Text className='text-neutral-400 mx-4 tracking-wide'>
                        {
                            movie?.overview
                        }
                    </Text>
                </View>
                {
                    cast.length>0 && <Cast navigation={navigation} cast={cast} />
                    }
               {
                similarMovies.length>0 && <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />
               }
            </ScrollView>
        </SafeAreaView>
    )
}
