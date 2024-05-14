import React, { useEffect } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const YouTubePlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player('youtube-player', {
        height: '315',
        width: '560',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          loop: 1,
          start: 300,
        },
        events: {
          onReady: onPlayerReady
        }
      });
    };

    return () => {
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = function() {};
      }    
    };
  }, [videoId]);

  const onPlayerReady = (event: any) => {
    event.target.playVideo();
  };

  return <div id="youtube-player"></div>;
};

export default YouTubePlayer;