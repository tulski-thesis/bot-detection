import { useState, useEffect } from "react";

export default function Headers({ path }: { path: string }) {
  const [loading, setLoading] = useState(false);
  const [headers, setHeaders] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(path, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setHeaders({
            ...[...res.headers.entries()].reduce(
              (obj, [key, value]) => {
                obj[key] = value;
                return obj;
              },
              {} as Record<string, any>,
            ),
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <pre
      className={`border-accents-2 border rounded-md bg-white overflow-x-auto p-6 mb-4 transition-all${
        loading ? " opacity-50" : ""
      }`}
    >
      {JSON.stringify({ path, headers }, null, 2)}
    </pre>
  );
}
