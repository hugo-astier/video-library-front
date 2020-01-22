import React from "react";
import ListGroup from "./common/listGroup";

const GenresDisplay = ({ resource, state }) => {
  const genres = resource.read();
  const { settings, setSettings, setSearchQuery } = state;
  const { currentGenreId } = settings;

  const handleGenreChange = genre => {
    setSettings({
      ...settings,
      currentGenreId: genre._id,
      currentPage: 1
    });
    setSearchQuery("");
  };

  return (
    <ListGroup
      groups={genres}
      currentGroupId={currentGenreId}
      onGroupChange={handleGenreChange}
    />
  );
};

export default GenresDisplay;
