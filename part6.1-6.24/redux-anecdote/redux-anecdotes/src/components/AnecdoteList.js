import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  updateNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  });

  const dispatch = useDispatch();
  const sortedAnecdote = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote));
    dispatch(updateNotification(`you voted for ${anecdote.content}`, 5));
  };

  return (
    <div>
      {sortedAnecdote.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
