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
                <h4 className="p-0 mt-2">Description</h4>
            </Container>
        </>
    );
};

export default Game;
