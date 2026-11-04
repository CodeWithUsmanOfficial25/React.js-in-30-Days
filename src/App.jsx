import React from "react";

function App() {
  return (
    <div>
      <React.Suspense fallback={<div>Loading Harvestly...</div>}>
        <Day15App />
      </React.Suspense>
    </div>
  );
}

function Day15App() {
  const [Component, setComponent] = React.useState(null);

  React.useEffect(() => {
    import("./days/Day15").then((module) => setComponent(() => module.default));
  }, []);

  return Component ? <Component /> : <div style={{ padding: 40 }}>Preparing something fresh...</div>;
}

export default App;
