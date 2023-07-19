import { Project } from "@/interfaces";

import Link from "next/link";

export default function ProjectOverview(project: Project) {
  return (
    <div className="container mx-auto p-10 rounded-2xl">
      <div className="bg-white rounded-xl">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover  text-center "
          style={{
            backgroundImage:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
          }}
          title="project image"
        ></div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center">
              <svg
                className="fill-current text-gray-500 w-3 h-3 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Private project
            </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {project.name}
            </div>
            <p className="text-gray-700 text-base">{project.description}</p>
          </div>
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="/img/jonathan.jpg"
              alt="Avatar of Jonathan Reinink"
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{project.authorId}</p>
              <p className="text-gray-600">Created on: July 19 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
