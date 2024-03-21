import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  //FETCH DATA FROM SMOOTHIES TABLE
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
      
      if (error) {
        setFetchError("Could not fetch the smoothies")
        setSmoothies(null)
        console.log(error)
      }

      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()
  }, [])
    
  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothiesCard">
          {smoothies.map(smoothie => (
            <p>{smoothie.title}</p>
          ))}
        </div>
      )}
    </div>
  )
}
  
  export default Home