import axios from 'axios';

export const addLevel = (levelData) => {
    axios.post('/api/level/addLevel', {
        level: levelData.level,
        moves: levelData.moves,
        time: levelData.time
    });
};
