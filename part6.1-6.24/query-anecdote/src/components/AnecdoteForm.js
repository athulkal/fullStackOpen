import { useQueryClient, useMutation } from "react-query";
import { createAnecdote } from "../services";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      console.log(newAnecdote);
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: (err) => {
      dispatch({ type: "SET", payload: err.response.data.error });
      setTimeout(() => {
        dispatch({ type: "RESET", payload: "" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: "SET", payload: `anecdote ${content} created` });
    setTimeout(() => {
      dispatch({ type: "RESET", payload: "" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
