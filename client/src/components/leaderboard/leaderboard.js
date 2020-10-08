import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
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
        text: 'Best Time (seconds)'
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
            //sort data
            const compare = (a, b) => {
                if (a.level < b.level) {
                    return -1;
                } else if (a.level === b.level && a.bestTime < b.bestTime) {
                    return -1;
                } else if (a.level === b.level && a.bestTime > b.bestTime) {
                    return 1;
                }
                return 0;
            };
            const sortedLevelData = data.levels.sort(compare);
            //set states
            setLevelData(sortedLevelData);
            setIsDataLoaded(true);
        }
    };

    useEffect(() => {
        getLevelsData();
    }, []);

    return (
        <>
            {isDataLoaded ? (
                <div className="p-5">
                    <div className="text-center m-1">
                        <h2>Leaderboard</h2>
                        <p className="text-muted">
                            Best time and number of moves are updated when time and moves are less
                            than or equal to previous attempt.
                        </p>
                    </div>
                    <BootstrapTable
                        keyField="_id"
                        columns={columns}
                        data={levelData}
                        striped
                        condensed
                        pagination={paginationFactory()}
                    />
                </div>
            ) : (
                <Container className="h-100 flex-xy-center">
                    <Spinner variant="primary" animation="border" role="status" className="mr-2" />
                    Loading Leaderboard...
                </Container>
            )}
        </>
    );
};

export default Leaderboard;
