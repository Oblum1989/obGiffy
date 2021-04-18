import { useContext, useEffect, useState } from 'react'
import getGifs from '../services/getGifs';
import GifsContext from '../context/GifsContext'


export function useGifs ({ keyword } = {keyword: null}) {
  const [loading, setLoading] = useState(false)
  const {gifs, setGifs} = useContext(GifsContext)

  const keywordToUSe = keyword || localStorage.getItem('lastKeyword') || 'random'

  useEffect(function () {
    setLoading(true)
    getGifs({ keyword: keywordToUSe })
      .then(gifs => {
        setGifs(gifs)
        setLoading(false)
        localStorage.setItem('lastKeyword', keyword)
      })
  }, [keyword, setGifs])
  return {loading, gifs}
}