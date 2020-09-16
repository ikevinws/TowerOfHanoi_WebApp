import axios from 'axios';

export const addLevel = async (levelData) => {
    try {
        axios.post('/api/level/addLevel', {
            level: levelData.level,
            moves: levelData.moves,
            time: levelData.time
        });
    } catch {
        //level was not added
    }
};
