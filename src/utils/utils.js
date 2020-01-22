const getMovieIdFromUrl = () => {
  const editMoviePathnameRegexp = /\/movies\/.+/;
  const pathname = new URL(window.location).pathname;
  return editMoviePathnameRegexp.test(pathname) ? pathname.substr(8) : null;
};

export default { getMovieIdFromUrl };
