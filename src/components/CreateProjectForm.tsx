import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { MapGeometryContext } from "@/context/context";
import { FormProps } from "@/interfaces";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { Project } from "@/interfaces";
import React, { useContext } from "react";
import RenderedMap from "@/components/RenderedMap";

export default function CreateProjectForm({ onSubmit }: FormProps) {
  const { mapGeometry } = useContext(MapGeometryContext);
  const { data: session } = useSession();

  const [project, setProject] = React.useState<Project>({
    id: uuidv4(),
    name: "1",
    description: "1",
    geometry: "",
    published: true,
    authorId: "default",
  });

  // Update project when mapGeometry changes
  React.useEffect(() => {
    setProject({ ...project, geometry: JSON.stringify(mapGeometry) });
  }, [mapGeometry]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedproject = {
      ...project,
      authorId: session?.user?.email || "default",
    };
    onSubmit(updatedproject);
  }

  return (
    <div class="container mx-auto p-10">
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              New Project
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              If you are logged in, only your account will have access to this
              project.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={handleInputChange}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about the project.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project area
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center w-full">
                    <RenderedMap />
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Draw a polygon encompassing the project area.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
