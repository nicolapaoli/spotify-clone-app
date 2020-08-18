import React from "react";
import "./Sidebar.css";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import SidebarOptions from "./SidebarOptions";
import {useDataLayerValue} from "./DataLayer";

function Sidebar () {

    const [{playlists}, dispatch] = useDataLayerValue();

    return (
        <div className="sidebar">
            <img className="sidebar__logo" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" alt="Spotify logo"/>
            <SidebarOptions title="Home" Icon={HomeIcon}/>
            <SidebarOptions title="Search" Icon={SearchIcon}/>
            <SidebarOptions title="Library" Icon={LibraryMusicIcon} />
            <strong className="sidebar__title">
                PLAYLISTS
            </strong>
            <hr />
            {playlists?.items?.map(playlist => (
                <SidebarOptions title={playlist.name} />
            ))}
        </div>
    )
}

export default Sidebar;