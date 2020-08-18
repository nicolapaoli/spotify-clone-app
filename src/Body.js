import React from "react";
import "./Body.css";
import Header from "./Header";
import {useDataLayerValue} from "./DataLayer";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SongRow from "./SongRow";

function Body({ spotify }) {

    const [{featured}, dispatch]  = useDataLayerValue();
    return (
        <div className="body">
            <Header spotify={spotify} />

            <div className="body__info">
                <img src={featured?.images[0].url} alt="Spotify logo"/>
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{featured?.name}</h2>
                    <p>{featured?.description}</p>
                </div>
            </div>

            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilledIcon className="body__shuffle"/>
                    <FavoriteIcon fontSize="large"/>
                    <MoreHorizIcon />
                </div>

                {featured?.tracks.items.map((item) => (
                   <SongRow track={item.track} />
                ))}
            </div>
        </div>
    )
}

export default Body;