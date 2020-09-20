import axios from 'axios';

export const addLevel = (levelData) => {
    axios.post('/api/level/addLevel', {
        level: levelData.level,
        moves: levelData.moves,
        time: levelData.time
    });
};

export const getLevels = async () => {
    try {
        const res = await axios.get('/api/level/getLevels');
        if (res.data) {
            return res.data;
        } else {
            return null;
        }
    } catch (err) {
        alert('Error: could not load data.\nThe page will be reloaded.');
        window.location.reload();
    }
};
