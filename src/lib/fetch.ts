/*
  Fetching data:
  {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
  }

*/

async function getData(): Promise<Todo> {
  return request<Todo>("https://jsonplaceholder.typicode.com/todos/1");
}

/*
    encapsulate a fetch request
  */

async function request<T>(url: string, config: RequestInit = {}): Promise<T> {
  const response = await fetch(url, config);
  const data = await response.json();
  return data;
}

/*
  predefined default behavior
  */
const api = {
  get: <TResponse>(url: string) => request<TResponse>(url),
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: "POST", body: body }),
};
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
