import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';

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
                productVersion: '0.1',
            })
            .then((unityInstance) => {
                if (unityInstance) {
                    setUnityInstanceLoaded((prevLoaded) => !prevLoaded);
                }
            })
            .catch(() => {
                // alert(message);
                window.location.reload();
            });
    }, []);

    /*
    cant use tenary to hide/show canvas because createUnityInstance needs
     canvas element with id=unity-canvas to exist when component is mounted
    */
    const displayGame = unityInstanceLoaded ? '' : 'd-none';
    const displayLoading = unityInstanceLoaded ? 'd-none' : 'game-canvas loading-game-canvas';
    return (
        <>
            <Container className="text-center p-0">
                <canvas id="unity-canvas" className={`${displayGame} game-canvas`} />
                <div className={displayLoading}>
                    <Spinner animation="border" role="status" variant="light">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    <span className="ml-2">Loading Game...</span>
                </div>
            </Container>
        </>
    );
};

export default Game;
