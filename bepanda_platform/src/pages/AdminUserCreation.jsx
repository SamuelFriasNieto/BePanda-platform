const AdminUserCreation = () => {
  return (
    <div className="mt-10 ">
      <form className="max-w-sm mx-auto border-black border-opacity-50 border-2 p-4 rounded-md">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@gmail.com"
        />

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
