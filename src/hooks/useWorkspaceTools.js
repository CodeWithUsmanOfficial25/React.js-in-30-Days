import { useCallback, useEffect, useMemo, useState } from "react";

export function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function useWorkspaceSearch(items, keys = ["name", "title", "company"]) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);
  const results = useMemo(() => {
    const term = debouncedQuery.trim().toLowerCase();
    if (!term) return items;
    return items.filter(item => keys.some(key => String(item[key] ?? "").toLowerCase().includes(term)));
  }, [items, keys, debouncedQuery]);
  return { query, setQuery, results };
}

export function useWorkspaceActions(dispatch) {
  const addTask = useCallback(payload => dispatch({ type: "ADD_TASK", payload }), [dispatch]);
  const toggleTask = useCallback(id => dispatch({ type: "TOGGLE_TASK", payload: id }), [dispatch]);
  const addLead = useCallback(payload => dispatch({ type: "ADD_LEAD", payload }), [dispatch]);
  const addProject = useCallback(payload => dispatch({ type: "ADD_PROJECT", payload }), [dispatch]);
  return { addTask, toggleTask, addLead, addProject };
}
