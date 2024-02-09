import { useEffect, useState } from "react";

export default function () {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const results = await window.electronAPI.prisma.user.findMany();
    setUsers(results);
  };

  const handleClick = async () => {
    await window.electronAPI.prisma.user.create({
      data: {
        name: Date.now().toString(),
      },
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Use Primsa In Browser</h1>
      <div>{JSON.stringify(users)}</div>
      <button onClick={handleClick}>新增用户</button>
    </div>
  );
}
