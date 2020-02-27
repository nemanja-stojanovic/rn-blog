import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React, { useContext, useEffect } from 'react';
import { Context } from "../context/BlogContext";

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

    useEffect(() => {
        getBlogPosts();
        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts()
        });
        return () => {
            listener.remove();
        }
    }, []);

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={item => item.title}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.id })}>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                                <Feather style={styles.icon} name='trash' />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
};

IndexScreen.navigationOptions = ({ navigation }) => ({
    headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name='plus' size={30} />
        </TouchableOpacity>
    )
});

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'grey'
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;