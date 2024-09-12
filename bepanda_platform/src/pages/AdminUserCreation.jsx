import { useEffect } from "react";

const AdminUserCreation = () => {


  useEffect(()=> {
    const params = {
      email: "hola@hola.com",
      name: "Joni"
    }
  
      fetch('http://localhost:3001/createUser', {
        method: 'POST', // Método HTTP POST para enviar los datos
        headers: {
          'Content-Type': 'application/json', // Asegúrate de que estás enviando JSON
        },
        body: JSON.stringify(params), // Convertimos el objeto a JSON
      })
      .then(data => data.json())
      .then(res => console.log(res))
  },[])

  

  return (
    <div className="mt-10 ">
      <form className="max-w-sm mx-auto border-black border-opacity-50 border-2 p-4 rounded-md">
      <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Nombre
        </label>
      <input
          type="name"
          id="name"
          name="name"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@gmail.com"
        />
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@gmail.com"
        />
        <button type="button" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Default</button>

        

        <p
          id="helper-text-explanation"
          className="mt-2 text-sm text-gray-500 dark:text-gray-400"
        >
          Al introducir el correo se creará automáticamente un usuario y una
          contraseña asociados a ese correo
        </p>
      </form>
    </div>
  );
};

export default AdminUserCreation;
