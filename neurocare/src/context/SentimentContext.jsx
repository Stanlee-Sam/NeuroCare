import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const SentimentContext = createContext();

export const SentimentProvider = ({ children }) => {
  const [sentiment, setSentiment] = useState(null);
  const [journalText, setJournalText] = useState(null);

  return (
    <SentimentContext.Provider value={{ sentiment, setSentiment, journalText, setJournalText }}>
      {children}
    </SentimentContext.Provider>
  );
};

SentimentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSentiment = () => useContext(SentimentContext);
