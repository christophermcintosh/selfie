import React from 'react';

export const Info = props => {
  const stats = props.stats;
  const emotion = props.mood;
  const emoji = props.emoji;

  return (
    <div id="info" className="text-center roboto animated fadeInUp">
      <div className="flex-container-info">
        <div>
          <p>
            <span className="text-bold">Gender:</span> {stats.gender}
          </p>
          <p>
            <span className="text-bold">Age:</span> {stats.age}
          </p>
          <p>
            <span className="text-bold">Ethnicity:</span> {stats.ethnicity}
          </p>
        </div>
        <div>
          <p className="capitalize">
            <span className="text-bold">Emotion:</span> {emotion}
          </p>
          <p className="emoji animated pulse infinite">{emoji}</p>
        </div>
      </div>
    </div>
  );
};
