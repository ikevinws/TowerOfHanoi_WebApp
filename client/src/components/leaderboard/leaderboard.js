import React, { useState, useEffect } from 'react';
import { Container, Spinner, Button } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import { getLevels } from '../../utils/levelAction';

//used to clear filters
let filtersObj = {};

const columns = [
    {
        dataField: 'level',
        text: 'Level',
        filter: textFilter({
            getFilter: (filter) => {
                filtersObj.levelFilter = filter;
            }
        })
    },
    {
        dataField: 'username',
        text: 'Username',
        filter: textFilter({
            getFilter: (filter) => {
                filtersObj.usernameFilter = filter;
            }
        })
    },
    {
        dataField: 'bestTime',
        text: 'Best Time (seconds)',
        filter: numberFilter({
            getFilter: (filter) => {
                filtersObj.bestTimeFilter = filter;
            }
        })
    },
    {
        dataField: 'bestMoves',
        text: 'Number of Moves',
        filter: numberFilter({
            getFilter: (filter) => {
                filtersObj.bestMovesFilter = filter;
            }
        })
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

    const handleFilterClearClick = () => {
        filtersObj.levelFilter('');
        filtersObj.usernameFilter('');
        filtersObj.bestTimeFilter('');
        filtersObj.bestMovesFilter('');
    };

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
                    <Button onClick={handleFilterClearClick}>Clear all filters</Button>
                    <BootstrapTable
                        keyField="_id"
                        columns={columns}
                        data={levelData}
                        striped
                        condensed
                        filterPosition="top"
                        pagination={paginationFactory()}
                        filter={filterFactory()}
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
