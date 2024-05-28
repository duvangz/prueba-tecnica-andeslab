
import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label
} from "recharts";

interface Album {
  id: number,
  userId: number,
  title: string
}

const getAlbums = async (): Promise<Album[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums")
  const albums = response.json()
  return albums
}

export default function AlbumsByUser() {
  const [albums, setAlbums] = useState<Album[]>([])

  useEffect(() => {
    getAlbums()
      .then((data) => setAlbums(data))
      .catch(error => console.error(error))
  }, [])

  const titlesByUser: { userId: number, count: number }[] = useMemo(() => {
    const usersMap = new Map<number, number>()

    for (let { userId } of albums) {
      usersMap.set(userId, (usersMap.get(userId) ?? 0) + 1)
    }

    return Array.from(usersMap, ([userId, count]) => ({ userId, count }))
  }, [albums])

  return (
    <BarChart
      width={500}
      height={300}
      data={titlesByUser}
      barSize={20}
      style={{ margin: "auto" }}
    >
      <XAxis dataKey="userId">
        <Label value="Usuario" offset={-5} position={"insideBottom"} />
      </XAxis>
      <YAxis>
        <Label value="Títulos" angle={-90} position={"insideLeft"} />
      </YAxis>
      <Tooltip formatter={(value) => [value, "Titulos"]} labelFormatter={(userId) => `Usuario ${userId}`} />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="count" fill="#2B2BD5" />
    </BarChart>
  );
}
