"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { DataPath } from "@prisma/client";
import type { DataElement } from "@prisma/client";
import type { DataOrigin } from "@prisma/client";
import axios from "axios";

const addCharacter = ({
  paths,
  elements,
  origins,
}: {
  paths: DataPath[];
  elements: DataElement[];
  origins: DataOrigin[];
}) => {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [element, setElement] = useState("");
  const [origin, setOrigin] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(path);
    await axios.post("/api/character", {
      name: name,
      path_id: Number(path),
      element_id: Number(element),
      origin_id: Number(origin),
    });
    setName("");
    setPath("");
    setElement("");
    setOrigin("");
    router.refresh();
    setIsOpen(false);
  };

  return (
    <>
      <button className="btn" onClick={handleModal}>
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Character</h3>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setPath(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Path
                </option>
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
                onChange={(e) => setElement(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Element
                </option>
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
                onChange={(e) => setOrigin(e.target.value)}
                className="select select-bordered"
              >
                <option value="" disabled>
                  Select a Origin
                </option>
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default addCharacter;
