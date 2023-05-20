"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { DataPath } from "@prisma/client";
import type { DataElement } from "@prisma/client";
import type { DataOrigin } from "@prisma/client";
import axios from "axios";

type Character = {
  id: number;
  name: string;
  path_id: number;
  element_id: number;
  origin_id: number;
};

const UpdateCharacter = ({
  character,
  paths,
  elements,
  origins,
}: {
  character: Character;
  paths: DataPath[];
  elements: DataElement[];
  origins: DataOrigin[];
}) => {
  const [name, setName] = useState(character.name);
  const [path, setPath] = useState(character.path_id);
  const [element, setElement] = useState(character.element_id);
  const [origin, setOrigin] = useState(character.origin_id);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(path);
    await fetch(`/api/character/${character.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        path_id: Number(path),
        element_id: Number(element),
        origin_id: Number(origin),
      }),
      cache: "no-store",
    });
    router.refresh();
    setIsOpen(false);
  };

  return (
    <>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Update Character {character.name}
          </h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Character Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Character Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Path</label>
              <select
                value={path}
                onChange={(e) => setPath(Number(e.target.value))}
                className="select select-bordered"
              >
                {paths.map((path) => (
                  <option value={path.id} key={path.id}>
                    {path.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Element</label>
              <select
                value={element}
                onChange={(e) => setElement(Number(e.target.value))}
                className="select select-bordered"
              >
                {elements.map((element) => (
                  <option value={element.id} key={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Origin</label>
              <select
                value={origin}
                onChange={(e) => setOrigin(Number(e.target.value))}
                className="select select-bordered"
              >
                {origins.map((origin) => (
                  <option value={origin.id} key={origin.id}>
                    {origin.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCharacter;
