"use client";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { DataElement } from "@prisma/client";

const mainForm = (
  fname: string,
  fdesc: string,
  btnName: String,
  submitBtnName: String,
  title: String,
  url: String,
  method: String
) => {
  const [name, setName] = useState(fname);
  const [desc, setDesc] = useState(fdesc);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await fetch(`${url}`, {
      method: `${method}`,
      body: JSON.stringify({
        name: name,
        desc: desc,
      }),
      cache: "no-store",
    });
    if (method === "POST") {
      setName("");
      setDesc("");
    }
    router.refresh();
    setIsOpen(false);
  };

  return (
    <>
      <button className="btn" onClick={handleModal}>
        {btnName}
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
                placeholder="Character Name"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Desc</label>
              <textarea
                className="input input-bordered"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Character Name"
              ></textarea>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {submitBtnName}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export const Add = () => {
  const fname = "";
  const fdesc = "";
  const btnName = "Add New";
  const submitBtnName = "Save";
  const title = "Add New Path";
  const url = "/api/era/data-element/dkrh";
  const method = "POST";

  return mainForm(fname, fdesc, btnName, submitBtnName, title, url, method);
};

export const Update = ({ elements }: { elements: DataElement }) => {
  const fname = elements.name;
  const fdesc = elements.desc;
  const btnName = "Edit";
  const submitBtnName = "Update";
  const title = "Update Path";
  const url = `/api/era/data-element/${elements.id}`;
  const method = "PATCH";

  return mainForm(fname, fdesc, btnName, submitBtnName, title, url, method);
};

export const Delete = ({ elements }: { elements: DataElement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    await fetch(`/api/era/data-element/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });
    setIsLoading(false);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="btn btn-error btn-sm" onClick={handleModal}>
        Delete
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {elements.name}?
          </h3>

          <div className="modal-action">
            <button type="button" className="btn" onClick={handleModal}>
              No
            </button>
            {!isLoading ? (
              <button
                type="button"
                onClick={() => handleDelete(elements.id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
