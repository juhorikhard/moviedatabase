import React from 'react';
import Result from './Result';

function Results({ results, openPopup }) {
  return (
    <section className='results'>
      {results && results.length > 0 && results.map(result => (
        <Result key={result.imdbID} result={result} openPopup={openPopup} />
      ))}
    </section>
  );
}

export default Results;

