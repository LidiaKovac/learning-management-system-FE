import { SectionReqBody } from "../interfaces/ClassInterfaces";
import { FileObject } from "../interfaces/FileTypes";
import { get_token_from_cookies } from "../utils";
const { REACT_APP_BACKEND_URL } = process.env;

export const search_class = async (query: String): Promise<any> => {
  const response = await fetch(`${REACT_APP_BACKEND_URL}class/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
    body: JSON.stringify({ query: query }),
  });
  const json = await response.json();

  for (let i = 0; i < json.length; i++) {
    const author_found = await get_author(json[i].author);
    json[i].author_data = author_found?.name + " " + author_found?.last_name;
    
  }
  delete json.author;
  if (json.length > 0) return json;
  else return [];
};

export const get_author = async (id: number | undefined): Promise<any> => {
  const response = await fetch(`${REACT_APP_BACKEND_URL}user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });
  const json = await response.json();
  if (json)
    return { name: json.name, last_name: json.last_name, email: json.email };
  else return null;
};

export const enroll = async (id: number): Promise<any> => {
  const response = await fetch(`${REACT_APP_BACKEND_URL}class/enroll/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });

  return await response.json();
};

export const create_new_course = async (
  class_n: Object | undefined
): Promise<any> => {
  const response = await fetch(`${REACT_APP_BACKEND_URL}class`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
    body: JSON.stringify(class_n),
  });
  return await response.json();
};

export const create_section = async(section:SectionReqBody | undefined, class_id:number) => {
    // /add-section/:class_id
    const response = await fetch(`${REACT_APP_BACKEND_URL}class/add-section/${class_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(section),
      });
      return await response.json();
}

export const get_created_classes = async () => {
  const response = await fetch(`${REACT_APP_BACKEND_URL}class/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });
  if (response.ok) {
    const json = await response.json();
    for (let i = 0; i < json.length; i++) {
      const author_found = await get_author(json[i].author);
      json[i].author_data = {
        name: author_found.name,
        last_name: author_found.last_name,
        email: author_found.email,
      };
    }
    delete json.author;
    if (typeof json !== "number" && json.length > 0) return json;
    else return [];
  }
};

export const get_enrolled = async () => {
  const response = await fetch(`${REACT_APP_BACKEND_URL}class/me/enrolled`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });
  const json = await response.json();
  for (let i = 0; i < json.length; i++) {
    const author_found = await get_author(json[i].author);
    json[i].author_data = {
      name: author_found.name,
      last_name: author_found.last_name,
      email: author_found.email,
    };
  }
  delete json.author;
  if (typeof json !== "number" && json.length > 0) return json;
  else return [];
};

export const get_single_class = async (id: number) => {
  const response = await fetch(`${REACT_APP_BACKEND_URL}class/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });
  if (response.ok) {
    const json = await response.json();

    const author_found = await get_author(json.class.author);
    ;
    json.author_data = {
      name: author_found.name,
      last_name: author_found.last_name,
      email: author_found.email,
    };
    for (let i = 0; i<json.sections.length; i++) {
      json.sections[i].files = json.files.filter((f:FileObject)=> f.section_ref === json.sections[i].section_id )
    }
    return json;
  }
};
