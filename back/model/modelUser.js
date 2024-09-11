export async function createUser(email, name) {
    const user = await prismadb.user.create({
        data: {
          email: email,
          name: name,
          cursosId: ["12345"]
        }
      })
}
