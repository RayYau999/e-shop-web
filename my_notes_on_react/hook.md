React hook notes:

# useRef vs useHook
 1. state will trigger re-render
 2. Ref will not trigger re-render
 3. Never use Ref in return function, because it won’t gonna change anything in the webview. The only use case use ref in render function is to access the DOM element like <input ref=“refvariable”>.. to call function on DOM (its not a rendering, its a immediate action on DOM when user do sth)
 
 # useReducer
 1.  const [todos, dispatch] = useReducer(reducer, initialTodos);
        -> useReducer is same as useState but with more complexity logic, we can separeate as the "State Object" and the dispatch function.
 2. reducer function is for programmer to write the logic for the state object in the function.
 3. In DOM, you may use <Input onChange={() => dispatch(todo)}>
 4. return {
        ...state,
        count: state.count + 1,
        error: "it reached the maximum"
    };
    This code mean
    -> return { ...state, ... }: This creates a new object that includes all properties from the state object.
    -> count: state.count + 1: This updates the count property to be one more than the current count.
    -> error: "it reached the maximum": This sets the error property to the specified string.

# React memo
 1. memo is used to prevent the rerender of a component if its props did not change in the parent re-rendering.
 2. child props change by parent component-> child component re-render
 3. const Todos = ({ todos }) => {
    console.log("child render");
    return (
        <>
       ...
        </>
    );
    };
    export default memo(Todos);

    -> If "todos" change , Todos need to be re-render

export default memo(Todos);

# useCallback with memo
 1. If Parent component need rerender but the child dont need. If we make the whole parent rerender, the child rerender will be a waste of resources.
 2. We dont want to rerender the child component which has the same state as the last time -> so we use "useCallback", to freeze the function and the data at that time.
 3. All is about "function" in parent change which changed in child component
 4. <ChildComponent onChange={handlechange}>
    -> handlechange will consider as child component props change if the parent re-render becasue of "referential equality"
    -> use "useCallback" on handlechange function can let react check the last state of the function and choose to freeze the function or not
    -> const handlechange = useCallback(() => {
            setTodos((t) => [...t, "New Todo"]);
        }, [todos]);    -----> "todos" is the state to make the callback not to freeze/ to run, you need sth to make the call back run right?


Summary:
1. useMemo: Memoizes the result of a computation to avoid recalculating it on every render. Useful for expensive calculations.
2. useCallback: Memoizes a function to avoid creating a new function on every render. Useful for passing stable function references to child components.