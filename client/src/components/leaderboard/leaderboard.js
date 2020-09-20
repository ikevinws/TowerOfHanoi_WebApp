import React, { useState, useEffect } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getLevels } from '../../utils/levelAction';

const columns = [
    {
        dataField: 'level',
        text: 'Level'
    },
    {
        dataField: 'username',
        text: 'Username'
    },
    {
        dataField: 'bestTime',
        text: 'Best Time'
    },
    {
        dataField: 'bestMoves',
        text: 'Number of Moves'
    }
];

const Leaderboard = () => {
    const [levelData, setLevelData] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const getLevelsData = async () => {
        const data = await getLevels();
        if (data) {
            setLevelData(data.levels);
            setIsDataLoaded(true);
            console.log(data.levels);
        }
    };

    useEffect(() => {
        getLevelsData();
    }, []);

    return (
        <div>
            {isDataLoaded ? (
                <BootstrapTable
                    keyField="_id"
                    columns={columns}
                    data={levelData}
                    striped
                    condensed
                    pagination={paginationFactory()}
                />
            ) : (
                <div>data is loading</div>
            )}
        </div>
    );
};

export default Leaderboard;
