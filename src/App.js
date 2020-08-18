import React, {useEffect, useState} from 'react';
import './App.css';

import Login from './Login';
import Player from './Player';
import {getTokenFromUrl} from "./Spotify";
import SpotifyWebApi from "spotify-web-api-js";
import {useDataLayerValue} from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {

    const [{user, token}, dispatch] = useDataLayerValue();

    // Run code based on a given condition
    useEffect(() => {
        const hash = getTokenFromUrl();
        window.location.hash = "";
        const _token = hash.access_token;

        if (_token) {
            dispatch({
                type: 'SET_TOKEN',
                token: _token
            });

            spotify.setAccessToken(_token);
            spotify.getMe()
                .then(user => {
                    dispatch({
                        type: 'SET_USER',
                        user: user
                    });
                });
            spotify.getUserPlaylists()
                .then((playlists => {
                    dispatch({
                        type: 'SET_PLAYLISTS',
                        playlists: playlists
                    })
                }));

            spotify.getFeaturedPlaylists()
                .then(resp => {
                    return spotify.getPlaylist(resp.playlists.items[0].id)
                })
                .then((featured) => {
                    dispatch({
                        type: 'SET_FEATURED',
                        featured: featured
                    });
                });

            console.log("I HAVE A TOKEN", _token);
        }

    }, []);

    return (
        <div className="app">
            {
                token ? (
                    <Player spotify={spotify}></Player>
                ) : (
                    <Login></Login>
                )
            }
        </div>
    );
}

export default App;
