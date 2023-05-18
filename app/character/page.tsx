import { prisma } from "@/prisma/db";
import AddCharacter from "./addCharacter";
import DeleteCharacter from "./deleteCharacter";
import UpdateCharacter from "./updateCharacter";

const getCharacters = async () => {
  const res = await prisma.character.findMany({
    select: {
      id: true,
      name: true,
      path_id: true,
      element_id: true,
      origin_id: true,
      path: true,
      element: true,
      origin: true,
    },
  });
  return res;
};

const getPath = async () => {
  const res = await prisma.dataPath.findMany();
  return res;
};

const getElement = async () => {
  const res = await prisma.dataElement.findMany();
  return res;
};

const getOrigin = async () => {
  const res = await prisma.dataOrigin.findMany();
  return res;
};

const Character = async () => {
  const [characters, paths, elements, origins] = await Promise.all([
    getCharacters(),
    getPath(),
    getElement(),
    getOrigin(),
  ]);

  return (
    <>
      <div className="mb-2">
        <AddCharacter paths={paths} elements={elements} origins={origins} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Path</th>
            <th>Element</th>
            <th>Origin</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((value, index) => (
            <tr key={value.id}>
              <td>{index + 1}</td>
              <td>{value.name}</td>
              <td>{value.path.name}</td>
              <td>{value.element.name}</td>
              <td>{value.origin.name}</td>
              <td>
                <UpdateCharacter
                  character={value}
                  paths={paths}
                  elements={elements}
                  origins={origins}
                />
                <DeleteCharacter character={value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Character;
