import AlbumsByUser from "./AlbumsByUser";
import Todos from "./Todos";

export default function App() {
  return (
    <>
      <h1>Cantidad de títulos por usuario</h1>
      <AlbumsByUser />
      <h1>Tareas completadas vs no completadas</h1>
      <Todos />
    </>
  )
}
