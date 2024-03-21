import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

//components
import SmoothieCard from "../components/SmoothieCard"

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
        <div className="smoothies">
          {/* Order by button */}
          <div className="smoothie-grid">
          {smoothies.map(smoothie => (
            <SmoothieCard key={smoothie.id} smoothie={smoothie}/>
          ))}
          </div>
        </div>
      )}
    </div>
  )
}
  
  export default Home