import { useContext } from "react";
import NotificationContext from "./NotificationContext";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAll, updateAnecdote } from "./services";

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updateAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      const updated = anecdotes.map((a) =>
        a.id !== updateAnecdote.id ? a : updateAnecdote
      );
      queryClient.setQueryData("anecdotes", updated);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "SET", payload: `anecdote ${anecdote.content} voted` });
    setTimeout(() => {
      dispatch({ type: "RESET", payload: "" });
    }, 5000);
  };

  const result = useQuery("anecdotes", getAll, {
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data ..</div>;
  } else if (result.error) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
