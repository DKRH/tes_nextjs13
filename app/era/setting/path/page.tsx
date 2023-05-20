import type { DataPath } from "@prisma/client";
import { Add, Update, Delete } from "./forms";

export const metadata = {
  title: "Data Paths",
};

const getDataPath = async () => {
  const path = await fetch(`${process.env.BASE_URL}/api/era/data-path/dkrh`, {
    cache: "no-store",
  });
  if (!path.ok) {
    console.log(path);
  }

  return path.json();
};

export default async function settingPath() {
  const paths: DataPath[] = await getDataPath();

  return (
    <>
      <div className="mb-2">
        <Add />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Desc</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {paths.map((value, index) => (
            <tr key={value.id}>
              <td>{index + 1}</td>
              <td>{value.name}</td>
              <td>{value.desc}</td>
              <td>
                <Update paths={value} />
                <Delete paths={value} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
