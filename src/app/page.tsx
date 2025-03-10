'use client';
import { usePeopleApi } from "./hooks/usePeopleApi";

export default function Home() {

  const { currentPerson, personHistory, error, loading, fetchData } = usePeopleApi()

  if (error) return <div>Error loading data</div>; 

  return (
    <div>
      <button onClick={fetchData} style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'blue', color: 'white'  }}>
        Fetch Data
      </button>
      {loading && <div style={{ textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading...</div>}
      <h1>Current Person</h1>
      <pre>{JSON.stringify(currentPerson, null, 2)}</pre>
      <h1>Person history</h1>
      <pre>{JSON.stringify(personHistory, null, 2)}</pre>
    </div>
  );
}
