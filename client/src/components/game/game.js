import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { addLevel } from '../../utils/levelAction';
import './game.scss';

const InitializeUnityInstanceFunctions = (addLevel) => {
    //functions for unity instance to use
    //possibly a better way then using window
    if (!window.handleWin) {
        window.handleWin = function (level, bestMoves, bestTime) {
            const levelData = {
                level: parseInt(level),
                moves: parseInt(bestMoves),
                time: Math.floor(parseFloat(bestTime) * 100) / 100
            };
            addLevel(levelData);
        };
    }
};

const Game = () => {
    const [unityInstanceLoaded, setUnityInstanceLoaded] = useState(false);
    useEffect(() => {
        const canvasElement = document.querySelector('#unity-canvas');
        window
            .createUnityInstance(canvasElement, {
                dataUrl: 'Build/UnityBuild.data',
                frameworkUrl: 'Build/UnityBuild.framework.js',
                codeUrl: 'Build/UnityBuild.wasm',
                streamingAssetsUrl: 'StreamingAssets',
                companyName: 'KevinProductions',
                productName: 'Tower Of Hanoi',
                productVersion: '0.1'
            })
            .then((unityInstance) => {
                if (unityInstance) {
                    setUnityInstanceLoaded((prevLoaded) => !prevLoaded);
                    InitializeUnityInstanceFunctions(addLevel);
                }
            })
            .catch(() => {
                alert('Could not load game. Page will be reloaded.');
                window.location.reload();
            });
    }, []);

    /**
     * cant use tenary to hide/show canvas because createUnityInstance needs
     * canvas element with id=unity-canvas to exist when component is mounted
     */
    const displayGame = unityInstanceLoaded ? 'game-canvas' : 'd-none';
    const displayLoading = unityInstanceLoaded ? 'd-none' : 'game-canvas loading-game-canvas';
    return (
        <>
            <Container className="p-0">
                <canvas id="unity-canvas" className={`${displayGame}`} />
                <div className={displayLoading}>
                    <Spinner animation="border" role="status" variant="light">
                        <span className="sr-only">Loading Game...</span>
                    </Spinner>
                    <span className="ml-2">Loading Game...</span>
                </div>
                <div>
                    <p className="float-right">Press F to Fullscreen</p>
                    <h4 className="p-0 mt-2">Game Rules</h4>
                    <ul>
                        <li>Only one disk can be moved at a time.</li>
                        <li>A disk can only be moved if it is the uppermost disk on a stack.</li>
                        <li>No disk may be placed on top of a smaller disk. </li>
                    </ul>
                </div>
            </Container>
        </>
    );
};

export default Game;
