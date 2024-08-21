import NewestTests from "./_components/newest-tests"
import Welcome from "./_components/welcome"

export default async function Home() {
  return (
    <main>
      <Welcome />
      <NewestTests />
    </main>
  )
}
